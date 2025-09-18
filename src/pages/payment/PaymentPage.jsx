import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Payment.css';
const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState('upi');
  const [formData, setFormData] = useState({
    upiId: '',
    selectedBank: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    selectedWallet: ''
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: 'Payment Successful!',
      text: 'You can now continue your chat.',
      icon: 'success',
      confirmButtonText: 'Continue to Chat',
      confirmButtonColor: '#4CAF50'
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to chat page
        window.location.href = "/chat";
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showSuccessAlert();
  };

  const renderUPIForm = () => (
    <div className="payment-content active" id="upi">
      <div className="qr-section">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourupi@okaxis" alt="QR Code" />
        <p><strong>Scan & Pay via UPI</strong></p>
      </div>
      <div className="input-group">
        <label>Or enter UPI ID</label>
        <input 
          type="text" 
          name="upiId"
          placeholder="yourname@upi" 
          value={formData.upiId}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>
        <i className="fas fa-check-circle"></i> Pay Now
      </button>
    </div>
  );

  const renderNetBankingForm = () => (
    <div className="payment-content" id="netbanking">
      <div className="input-group">
        <label>Select Your Bank</label>
        <select 
          name="selectedBank"
          value={formData.selectedBank}
          onChange={handleInputChange}
        >
          <option value="">Choose your bank</option>
          <option value="SBI">SBI</option>
          <option value="HDFC">HDFC</option>
          <option value="ICICI">ICICI</option>
          <option value="Axis Bank">Axis Bank</option>
          <option value="Kotak">Kotak</option>
        </select>
      </div>
      <button onClick={handleSubmit}>
        <i className="fas fa-university"></i> Continue to Bank
      </button>
    </div>
  );

  const renderCardForm = () => (
    <div className="payment-content" id="card">
      <div className="input-group">
        <label>Card Number</label>
        <input 
          type="text" 
          name="cardNumber"
          placeholder="1234 5678 9012 3456" 
          value={formData.cardNumber}
          onChange={handleInputChange}
          maxLength="19"
        />
      </div>
      <div className="input-group">
        <label>Expiry Date</label>
        <input 
          type="text" 
          name="expiryDate"
          placeholder="MM/YY" 
          value={formData.expiryDate}
          onChange={handleInputChange}
          maxLength="5"
        />
      </div>
      <div className="input-group">
        <label>CVV</label>
        <input 
          type="password" 
          name="cvv"
          placeholder="123" 
          value={formData.cvv}
          onChange={handleInputChange}
          maxLength="3"
        />
      </div>
      <button onClick={handleSubmit}>
        <i className="fas fa-lock"></i> Pay ₹999
      </button>
    </div>
  );

  const renderWalletForm = () => (
    <div className="payment-content" id="wallet">
      <div className="input-group">
        <label>Select Wallet</label>
        <select 
          name="selectedWallet"
          value={formData.selectedWallet}
          onChange={handleInputChange}
        >
          <option value="">Choose your wallet</option>
          <option value="Paytm">Paytm</option>
          <option value="PhonePe">PhonePe</option>
          <option value="Google Pay">Google Pay</option>
          <option value="Amazon Pay">Amazon Pay</option>
        </select>
      </div>
      <button onClick={handleSubmit}>
        <i className="fas fa-wallet"></i> Proceed to Wallet
      </button>
    </div>
  );

  return (
    <div className="container">
      <h2 className="heading">
        <i className="fas fa-credit-card"></i> Subscribe & Pay
      </h2>

      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'upi' ? 'active' : ''}`} 
          onClick={() => handleTabChange('upi')}
        >
          <i className="fas fa-qrcode"></i> UPI
        </div>
        <div 
          className={`tab ${activeTab === 'netbanking' ? 'active' : ''}`} 
          onClick={() => handleTabChange('netbanking')}
        >
          <i className="fas fa-university"></i> Net Banking
        </div>
        <div 
          className={`tab ${activeTab === 'card' ? 'active' : ''}`} 
          onClick={() => handleTabChange('card')}
        >
          <i className="far fa-credit-card"></i> Card
        </div>
        <div 
          className={`tab ${activeTab === 'wallet' ? 'active' : ''}`} 
          onClick={() => handleTabChange('wallet')}
        >
          <i className="fas fa-wallet"></i> Wallet
        </div>
      </div>

      {activeTab === 'upi' && renderUPIForm()}
      {activeTab === 'netbanking' && renderNetBankingForm()}
      {activeTab === 'card' && renderCardForm()}
      {activeTab === 'wallet' && renderWalletForm()}
    </div>
  );
};

export default PaymentPage;