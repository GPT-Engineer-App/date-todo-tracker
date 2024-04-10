import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Flex, Text, Checkbox, VStack, Spacer, HStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date().toISOString() : null,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Box maxWidth="500px" margin="auto" p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        TODO App
      </Heading>
      <Flex mb={4}>
        <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a new todo" mr={2} />
        <Button onClick={handleAddTodo} colorScheme="blue" leftIcon={<FaPlus />}>
          Add
        </Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {todos.map((todo) => (
          <Box key={todo.id} p={4} borderWidth={1} borderRadius="md" backgroundColor={todo.completed ? "green.100" : "white"}>
            <HStack>
              <Checkbox isChecked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
              <Text textDecoration={todo.completed ? "line-through" : "none"}>{todo.text}</Text>
              <Spacer />
              <Button size="xs" onClick={() => handleDeleteTodo(todo.id)} colorScheme="red">
                Delete
              </Button>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </Text>
            {todo.completed && (
              <Text fontSize="sm" color="gray.500">
                Completed: {new Date(todo.completedAt).toLocaleString()}
              </Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
