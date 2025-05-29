// sidebar.tsx
import {
  Box,
  Stack,
  Avatar,
  Text,
  Button,
  Flex,
  Divider,
} from '@mantine/core';
import {
  IconDashboard,
  IconBell,
  IconUser,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react';

export default function Sidebar() {

  return (
    <Flex
      direction="column"
      justify="space-between"
      w={250}
      h="100vh"
      p="md"
      bg="gray.1"
    >
      <Stack spacing="lg">
        <Stack align="center" spacing="xs">
          <Avatar radius="xl" size="lg" />
          <Text fw={600}>Tim Müller</Text>
          <Text size="xs" c="dimmed">
            ABCD
          </Text>
        </Stack>

        <Stack spacing="sm" mt="md">
          <Button
            variant="light"
            fullWidth
            leftSection={<IconDashboard size={16} />}
          >
            ABCD
          </Button>
          <Button
            variant="subtle"
            fullWidth
            leftSection={<IconBell size={16} />}
          >
            ABCD
          </Button>
        </Stack>
      </Stack>

      <Stack spacing="sm">
        <Divider />
        <Button
          variant="subtle"
          fullWidth
          leftSection={<IconUser size={16} />}
        >
          FGHJ
        </Button>
        <Button
          variant="subtle"
          fullWidth
          leftSection={<IconSettings size={16} />}
        >
          RTYU
        </Button>
        <Button
          variant="light"
          color="red"
          fullWidth
          leftSection={<IconLogout size={16} />}
        >
          DERF
        </Button>
      </Stack>
    </Flex>
  );
}
