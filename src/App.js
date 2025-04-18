import { useState } from 'react';

function App() {
  const [pepperoni, setPepperoni] = useState(false);
  const [size, setSize] = useState('Small');
  const [contactInfo, setContactInfo] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const togglePepperoni = () => setPepperoni(!pepperoni);
  const handleSizeChange = (e) => setSize(e.target.value);
  const handleContactChange = (e) => setContactInfo(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderSubmitted(true);
  };

  return (
    <div>
      <h1>Place an Order</h1>
      <form onSubmit={handleSubmit}>
        {/* Size Selection */}
        <div>
          <h3>Size</h3>
          <label htmlFor="size">Size</label>
          <select 
            id="size" 
            value={size} 
            onChange={handleSizeChange}
            aria-label="Size"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div>
          <h3>Toppings</h3>
          <input
            type="checkbox"
            id="pepperoni"
            checked={pepperoni}
            onChange={togglePepperoni}
          />
          <label htmlFor="pepperoni">Add pepperoni</label>
        </div>
        <div>
          <h3>Contact Info</h3>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={contactInfo}
            onChange={handleContactChange}
            placeholder="Enter your email"
          />
        </div>
        <div data-testid="selection-display">
          Your Selection: {size} {pepperoni ? 'pepperoni' : ''}
        </div>
        <button type="submit">Place Order</button>
      </form>
   {orderSubmitted && <p>Thank you for your order!</p>}
    </div>
  );
}

export default App;