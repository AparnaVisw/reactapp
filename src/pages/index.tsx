import { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Group,
  Stack,
  TextInput,
  Title,
  Card,
  Text,
  Divider,
  ActionIcon,
  SegmentedControl,
} from '@mantine/core';
import { IconTrash, IconEdit, IconCheck } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { auth } from '../auth'; // Make sure path is correct

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = 'task-manager-tasks';

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const logout = () => {
    auth.logout();
    navigate({ to: '/login' });
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask('');
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.title);
  };

  const saveEdit = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: editingText } : task
      )
    );
    setEditingTaskId(null);
    setEditingText('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
  });

  return (
    <Stack>
      <Group position="apart" align="center">
        <Title order={3}>🗂️ Task Manager</Title>
        <Button color="red" onClick={logout}>
          Logout
        </Button>
      </Group>

      <Group>
        <TextInput
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <Button onClick={addTask}>Add Task</Button>
      </Group>

      <SegmentedControl
        fullWidth
        value={filter}
        onChange={(value) => setFilter(value as 'all' | 'completed' | 'pending')}
        data={[
          { label: 'All', value: 'all' },
          { label: 'Pending', value: 'pending' },
          { label: 'Completed', value: 'completed' },
        ]}
        my="md"
      />

      <Divider />

      <Stack>
        {filteredTasks.length === 0 && (
          <Text c="dimmed">No tasks found for this filter.</Text>
        )}

        {filteredTasks.map((task) => (
          <Card key={task.id} shadow="sm" radius="md" withBorder>
            <Group position="apart" align="start">
              <Group align="start" style={{ flex: 1 }}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />

                {editingTaskId === task.id ? (
                  <TextInput
                    value={editingText}
                    onChange={(e) => setEditingText(e.currentTarget.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(task.id);
                    }}
                    autoFocus
                    style={{ flex: 1 }}
                  />
                ) : (
                  <Text
                    onClick={() => startEditing(task)}
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {task.title}
                  </Text>
                )}
              </Group>

              <Group spacing={4}>
                {editingTaskId === task.id ? (
                  <ActionIcon
                    color="green"
                    variant="light"
                    onClick={() => saveEdit(task.id)}
                    title="Save"
                  >
                    <IconCheck size={16} />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    color="blue"
                    variant="light"
                    onClick={() => startEditing(task)}
                    title="Edit"
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                )}
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => deleteTask(task.id)}
                  title="Delete"
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Group>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
