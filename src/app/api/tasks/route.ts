import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching tasks', error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { title, description, startDate, endDate, color } = await req.json();

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        color,
        userId,
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating task', error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { id, title, description, startDate, endDate, color } = await req.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id), userId },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        color,
      },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating task', error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Task ID is required' }, { status: 400 });
  }

  try {
    await prisma.task.delete({
      where: { id: Number(id), userId },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting task', error }, { status: 500 });
  }
}
