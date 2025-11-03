def add(a, b):
    """Returns the sum of two numbers."""
    return a + b

def subtract(a, b):
    """Returns the difference of two numbers."""
    return a - b

def multiply(a, b):
    """Returns the product of two numbers."""
    return a * b

def divide(a, b):
    """Returns the quotient of two numbers. Raises ValueError if dividing by zero."""
    if b == 0:
        raise ValueError("Cannot divide by zero.")
    return a / b

def power(base, exponent):
    """Returns the result of raising base to the power of exponent."""
    return base ** exponent

def square_root(value):
    """Returns the square root of a number. Raises ValueError if the value is negative."""
    if value < 0:
        raise ValueError("Cannot take the square root of a negative number.")
    return value ** 0.5

def factorial(n):
    """Returns the factorial of a non-negative integer n. Raises ValueError if n is negative."""
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers.")
    if n == 0 or n == 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result