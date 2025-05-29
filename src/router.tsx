import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
    redirect,
  } from '@tanstack/react-router'
  import { auth } from './auth'
  import LoginPage from './pages/LoginPage'
  import Index from './pages/index'
  import {
    ActionIcon,
    Container,
    Group,
    Title,
    Paper
  } from '@mantine/core';
  import { IconSun, IconMoonStars } from '@tabler/icons-react';
  
  // Layout component
  const RootComponent = () => {
    return (
      <Container size="md" py="xl">
      <Paper withBorder shadow="sm" radius="md" p="lg">
        <Group position="apart" mb="md">
          <Title order={2} align="center">📝 Task Manager App</Title>
        </Group>
        <Outlet />
      </Paper>
    </Container>
    )
  }
  
  // Root route (ONLY ONE!)
  const rootRoute = createRootRoute({
    component: RootComponent,
  })
  
  // Components
  const Home = () => <Index/>
  const About = () => <div>About Page</div>
  
  // Auth logic
  const requireAuth = async () => {
    if (!auth.check()) {
      throw redirect({ to: '/login' })
    }
  }
  
  const redirectIfLoggedIn = async () => {
    if (auth.check()) {
      throw redirect({ to: '/' })
    }
  }
  
  // Routes
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
    beforeLoad: requireAuth,
  })
  
  const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
    beforeLoad: requireAuth,
  })
  
  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
    beforeLoad: redirectIfLoggedIn,
  })
  
  // Register all routes on one root
  const routeTree = rootRoute.addChildren([
    indexRoute,
    aboutRoute,
    loginRoute,
  ])
  
  // Export router
  export const router = createRouter({ routeTree })

