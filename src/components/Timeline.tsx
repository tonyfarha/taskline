"use client";

import { Task } from "@/types";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TimelineProps {
  tasks: Task[];
}

// Helper function to get the number of days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to normalize a date to the start of the day
const normalizeDate = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

// Helper function to calculate the position and span of a task
const getTaskStyle = (task: Task, timelineStartDate: Date, totalDaysInView: number) => {
  const taskStart = normalizeDate(new Date(task.startDate));
  const taskEnd = normalizeDate(new Date(task.endDate));
  const normalizedTimelineStartDate = normalizeDate(timelineStartDate);

  // Create a date for the end of the timeline view
  const timelineEndDate = new Date(normalizedTimelineStartDate);
  timelineEndDate.setDate(normalizedTimelineStartDate.getDate() + totalDaysInView - 1);
  const normalizedTimelineEndDate = normalizeDate(timelineEndDate);

  // Clamp the task's start and end dates to be within the timeline's view
  const effectiveStartDate = taskStart < normalizedTimelineStartDate ? normalizedTimelineStartDate : taskStart;
  const effectiveEndDate = taskEnd > normalizedTimelineEndDate ? normalizedTimelineEndDate : taskEnd;

  // Calculate the difference in days from the start of the timeline
  let startOffset = 0;
  let tempStartDate = new Date(normalizedTimelineStartDate);
  while (tempStartDate.getTime() < effectiveStartDate.getTime()) {
    tempStartDate.setDate(tempStartDate.getDate() + 1);
    startOffset++;
  }

  // Calculate the duration of the task within the view
  let duration = 0;
  let tempEndDate = new Date(effectiveStartDate);
  while (tempEndDate.getTime() <= effectiveEndDate.getTime()) {
    tempEndDate.setDate(tempEndDate.getDate() + 1);
    duration++;
  }

  // Don't render the task if it's completely outside the current view
  if (startOffset >= totalDaysInView || startOffset + duration <= 0 || duration <= 0) {
    return { display: 'none' };
  }

  return {
    // The +2 accounts for the task title column at the beginning of the grid
    gridColumnStart: Math.floor(startOffset) + 2,
    gridColumnEnd: `span ${Math.ceil(duration)}`,
    backgroundColor: task.color,
  };
};


export const Timeline = ({ tasks }: TimelineProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return newDate;
    });
  };

  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const totalDays = getDaysInMonth(startDate.getFullYear(), startDate.getMonth());

  const dates = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });

  return (
    <div className="border rounded-lg overflow-x-auto bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between p-4">
        <button onClick={handlePrevMonth} className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth} className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: `minmax(150px, 1fr) repeat(${totalDays}, 1fr)`,
          gridTemplateRows: `auto repeat(${tasks.length}, minmax(40px, 1fr))`,
        }}
      >
        <div className="sticky left-0 z-10 p-2 font-bold text-center border-b border-r bg-gray-100 dark:bg-gray-800">Task</div>

        {dates.map((date, index) => (
          <div key={index} className="p-2 text-center border-b border-r text-xs flex items-center justify-center h-full">
            <div className="font-bold text-lg">{date.getDate()}</div>
          </div>
        ))}

        {tasks.map((task, taskIndex) => (
          <>
            <div
              key={`title-${task.id}`}
              className="sticky left-0 z-10 p-2 text-sm border-b border-r bg-gray-50 dark:bg-gray-900 whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ gridRow: taskIndex + 2 }}
            >
              {task.title}
            </div>

            <div
              key={`bar-${task.id}`}
              className="h-6 rounded mx-px opacity-80 hover:opacity-100"
              style={{
                gridRow: taskIndex + 2,
                ...getTaskStyle(task, startDate, totalDays),
              }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <div className="w-full h-full cursor-pointer"></div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: task.color }}></div>
                    <h4 className="font-bold">{task.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                  </p>
                  {task.description && <p className="mt-2 text-sm">{task.description}</p>}
                </PopoverContent>
              </Popover>
            </div>
          </>
        ))}
      </div>
      {tasks.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
          No tasks yet. Create a task to see it on the timeline.
        </div>
      )}
    </div>
  );
};
