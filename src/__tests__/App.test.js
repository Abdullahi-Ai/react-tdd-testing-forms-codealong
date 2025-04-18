import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

describe("Pizza Order Form", () => {
  // Pepperoni checkbox tests
  test("checkbox is initially unchecked", () => {
    render(<App />);
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
    expect(addPepperoni).not.toBeChecked();
  });

  test("checkbox appears as checked when user clicks it", async () => {
    render(<App />);
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
    await userEvent.click(addPepperoni);
    expect(addPepperoni).toBeChecked();
  });

  test("checkbox appears as unchecked when user clicks a second time", async () => {
    render(<App />);
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
    await userEvent.click(addPepperoni);
    await userEvent.click(addPepperoni);
    expect(addPepperoni).not.toBeChecked();
  });

  // Size selection tests
  test("'Your Selection' message initially displays 'Small'", () => {
    render(<App />);
    expect(screen.getByText(/your selection: small/i)).toBeInTheDocument();
  });

  test("selecting options updates the 'Your selection' message", async () => {
    render(<App />);
    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
    const selectSize = screen.getByLabelText(/size/i);

    await userEvent.click(addPepperoni);
    expect(screen.getByText(/your selection: small pepperoni/i)).toBeInTheDocument();

    await userEvent.selectOptions(selectSize, "Large");
    expect(screen.getByText(/your selection: large pepperoni/i)).toBeInTheDocument();
  });

  // Contact Info tests
  test("the page shows information the user types into the contact form field", async () => {
    render(<App />);
    const contact = screen.getByLabelText(/email/i);
    await userEvent.type(contact, "pizzafan@email.com");
    expect(contact).toHaveValue("pizzafan@email.com");
  });

  // Order submission tests
  test("form contains a 'Submit Order' button", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /place order/i })).toBeInTheDocument();
  });

  test("clicking the Submit Order button displays a thank you message", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: /place order/i }));
    expect(screen.getByText(/thank you for your order!/i)).toBeInTheDocument();
  });
});