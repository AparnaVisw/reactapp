import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Title,
  Text,
  Stack,
  Checkbox,
  Loader,
  Paper,
  Progress,
  Popover,
  Box,
  Fieldset
} from '@mantine/core';
import { IconEyeCheck, IconEyeOff, IconX, IconCheck } from '@tabler/icons-react';
import { useNavigate } from '@tanstack/react-router';
import { auth } from '../auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [popoverOpened, setPopoverOpened] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = auth.login(username, password, rememberMe);
    setTimeout(() => {
      setLoading(false);
      if (result.success) {
        navigate({ to: '/' });
      } else {
        setError(result.message || 'Login failed');
      }
    }, 500);
  };

  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
      <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    ) : (
      <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    );

  const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
  ];

  const getStrength = (password: string) => {
    let multiplier = password.length > 5 ? 0 : 1;
    requirements.forEach((r) => {
      if (!r.re.test(password)) {
        multiplier += 1;
      }
    });
    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  };

  const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => (
    <Text
  c={meets ? 'teal' : 'red'}
  style={{ display: 'flex', alignItems: 'center' }}
  mt={7}
  size="sm"
>
  {meets ? <IconCheck size={14} /> : <IconX size={14} />}
  <span style={{ marginLeft: 10 }}>{label}</span> {/* ✅ span is allowed inside <p> */}
</Text>
  );

  const strength = getStrength(password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
  ));

  return (
    <Container size={420} my={80}>
      <Title align="center" mb="lg">
        Login
      </Title>
      <Paper shadow="md"
        p="xl"
        radius="md"
        withBorder
        bg="gray.1"
        style={{ backgroundColor: 'red' }}
      >
            <form onSubmit={handleSubmit}>
            <Stack spacing="md">
            <Title order={4}>Personal information</Title> 
                {error && <Text color="red">{error}</Text>}

                <TextInput
                label="Username"
                placeholder="Enter username"
                value={username}
                required
                onChange={(e) => setUsername(e.currentTarget.value)}
                styles={{ input: { paddingRight: '3rem' } }}
                />

                <Popover
                opened={popoverOpened}
                position="bottom"
                width="target"
                transitionProps={{ transition: 'pop' }}
                >
                <Popover.Target>
                    <div
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                    >
                    <PasswordInput
                        label="Password"
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        visibilityToggleIcon={VisibilityToggleIcon}
                    />
                    </div>
                </Popover.Target>
                <Popover.Dropdown>
                    <Progress color={color} value={strength} size={5} mb="xs" />
                    <PasswordRequirement label="Includes at least 6 characters" meets={password.length > 5} />
                    {checks}
                </Popover.Dropdown>
                </Popover>

                <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.currentTarget.checked)}
                icon={() => null}
                />

                <Button type="submit" fullWidth disabled={loading}>
                {loading ? <Loader size="xs" color="white" /> : 'Login'}
                </Button>
            </Stack>
            </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
