import { Container } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';

export default function AuthLayout() {
  return (
    <Container size={420} my={80}>
      <Outlet />
    </Container>
  );
}
