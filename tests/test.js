import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios'; // Mocking axios for testing
import StudentTable from './StudentTable';


// https://jestjs.io/docs/testing-frameworks
// https://testing-library.com/docs/react-testing-library/example-intro/

// Mocking axios.get for testing purposes
jest.mock('axios');

// Mocked response data for axios.get
const mockedStudents = [
  { rollNo: 1, name: 'John Doe', percentage: 85, branch: 'Computer Science', subjects: ['Math', 'Physics'] },
  { rollNo: 2, name: 'Jane Doe', percentage: 78, branch: 'Electrical Engineering', subjects: ['Chemistry', 'Biology'] },
];

// Mocked environment variables for testing
process.env.REACT_APP_API_URL = 'http://api.example.com';
process.env.REACT_APP_React_Host = 'localhost';
process.env.REACT_APP_React_Port = '3001';
process.env.REACT_APP_Student_Endpoint = '/students';

// Mocking the axios.get implementation
axios.get.mockResolvedValue({ data: mockedStudents });

describe('StudentTable Component', () => {
  beforeEach(() => {
    render(<StudentTable />);
  });

  test('renders student data correctly', async () => {
    // Wait for the axios.get mock to resolve
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Check if the student data is rendered correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('expands and collapses student accordion', async () => {
    // Wait for the axios.get mock to resolve
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Click on the "Expand" button for the first student
    fireEvent.click(screen.getByText('Expand'));

    // Check if the subjects are displayed
    expect(screen.getByText('Subjects:')).toBeInTheDocument();
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Physics')).toBeInTheDocument();

    // Click on the "Collapse" button for the first student
    fireEvent.click(screen.getByText('Collapse'));

    // Check if the subjects are no longer displayed
    await waitFor(() => expect(screen.queryByText('Subjects:')).toBeNull());
  });

  test('searches for students', async () => {
    // Wait for the axios.get mock to resolve
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Type a search term in the input field
    fireEvent.change(screen.getByPlaceholderText('Search by rollNo'), { target: { value: '1' } });

    // Click on the "Search" button
    fireEvent.click(screen.getByText('Search'));

    // Check if the search result is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Doe')).toBeNull(); // Jane Doe should not be visible

    // Click on the "Reset" button
    fireEvent.click(screen.getByText('Reset'));

    // Check if the original students are displayed again
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});
