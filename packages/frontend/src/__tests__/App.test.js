import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('deletes a todo when delete button is clicked', async () => {
  const user = userEvent.setup();
  const testQueryClient = createTestQueryClient();

  const mockTodos = [
    { id: 1, title: 'Test Todo', completed: false, createdAt: new Date().toISOString() },
  ];

  // Mock initial fetch to return todos
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todo to appear
  await screen.findByText('Test Todo');

  // Mock delete response
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );

  // Mock refetch after delete
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  // Click delete button
  const deleteButton = screen.getByLabelText(/delete/i);
  await user.click(deleteButton);

    // Verify DELETE request was made
  await waitFor(() => {
    const deleteCalls = global.fetch.mock.calls.filter(
      call => call[1]?.method === 'DELETE'
    );
    expect(deleteCalls.length).toBeGreaterThan(0);
  });
  
  const deleteCalls = global.fetch.mock.calls.filter(
    call => call[1]?.method === 'DELETE'
  );
  expect(deleteCalls[0][0]).toContain('/api/todos/1');
});

test('displays correct stats for incomplete and completed todos', async () => {
  const testQueryClient = createTestQueryClient();

  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'Todo 2', completed: true, createdAt: new Date().toISOString() },
    { id: 3, title: 'Todo 3', completed: false, createdAt: new Date().toISOString() },
  ];

  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for stats to appear and verify counts
  await screen.findByText('2 items left');
  expect(screen.getByText('1 completed')).toBeInTheDocument();
});

test('displays empty state message when no todos exist', async () => {
  const testQueryClient = createTestQueryClient();

  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for empty state message to appear
  await screen.findByText(/no todos yet/i);
  expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
});

test('edits a todo when edit button is clicked and saved', async () => {
  const user = userEvent.setup();
  const testQueryClient = createTestQueryClient();

  const mockTodos = [
    { id: 1, title: 'Original Title', completed: false, createdAt: new Date().toISOString() },
  ];

  // Mock initial fetch
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todo to appear
  await screen.findByText('Original Title');

  // Click edit button
  const editButton = screen.getByLabelText(/edit/i);
  await user.click(editButton);

  // Find the text input and change the value
  const input = screen.getByDisplayValue('Original Title');
  await user.clear(input);
  await user.type(input, 'Updated Title');

  // Mock PUT response
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1, title: 'Updated Title', completed: false }),
    })
  );

  // Mock refetch after edit
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, title: 'Updated Title', completed: false, createdAt: new Date().toISOString() },
      ]),
    })
  );

  // Click save button
  const saveButton = screen.getByLabelText(/save/i);
  await user.click(saveButton);

    // Verify PUT request was made
  await waitFor(() => {
    const putCalls = global.fetch.mock.calls.filter(
      call => call[1]?.method === 'PUT'
    );
    expect(putCalls.length).toBeGreaterThan(0);
  });
  
  const putCalls = global.fetch.mock.calls.filter(
    call => call[1]?.method === 'PUT'
  );
  expect(putCalls[0][0]).toContain('/api/todos/1');
});

test('displays error message when API request fails', async () => {
  const testQueryClient = createTestQueryClient();

  // Mock fetch to reject/fail
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error('Network error'))
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for error message to appear
  await screen.findByText(/error loading todos/i);
  expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
});

afterEach(() => {
  jest.clearAllMocks();
});
