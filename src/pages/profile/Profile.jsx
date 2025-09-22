
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserCard from "./UserCard";
import { ChevronLeft, ChevronRight, User, Filter } from "lucide-react";
import defImg from "../../assets/images/profile/Women-Avtar.jpg";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const [filters, setFilters] = useState({
    online: 'all',
    ageRange: 'all',
    location: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Mock users data
  const mockUsers = [
    { id: 1, name: "Priya Sharma", age: "22 Years Old", image: defImg, online: true, location: "Delhi", interests: ["Photography", "Travel"], requested: false, ageNum: 22 },
    { id: 2, name: "Rahul Verma", age: "25 Years Old", image: defImg, online: false, location: "Mumbai", interests: ["Music", "Sports"], requested: false, ageNum: 25 },
    { id: 3, name: "Sneha Gupta", age: "23 Years Old", image: defImg, online: true, location: "Bangalore", interests: ["Reading", "Cooking"], requested: false, ageNum: 23 },
    { id: 4, name: "Arjun Singh", age: "26 Years Old", image: defImg, online: true, location: "Pune", interests: ["Gaming", "Movies"], requested: false, ageNum: 26 },
    { id: 5, name: "Kavya Patel", age: "24 Years Old", image: defImg, online: false, location: "Ahmedabad", interests: ["Dancing", "Art"], requested: false, ageNum: 24 },
    { id: 6, name: "Ravi Kumar", age: "27 Years Old", image: defImg, online: true, location: "Hyderabad", interests: ["Fitness", "Travel"], requested: false, ageNum: 27 },
    { id: 7, name: "Anita Reddy", age: "24 Years Old", image: defImg, online: true, location: "Chennai", interests: ["Yoga", "Music"], requested: false, ageNum: 24 },
    { id: 8, name: "Vikram Singh", age: "28 Years Old", image: defImg, online: false, location: "Jaipur", interests: ["Photography", "Books"], requested: false, ageNum: 28 },
    { id: 9, name: "Meera Joshi", age: "25 Years Old", image: defImg, online: true, location: "Kolkata", interests: ["Art", "Fashion"], requested: false, ageNum: 25 },
    { id: 10, name: "Rohit Sharma", age: "26 Years Old", image: defImg, online: true, location: "Lucknow", interests: ["Cricket", "Movies"], requested: false, ageNum: 26 },
    { id: 11, name: "Pooja Singh", age: "23 Years Old", image: defImg, online: false, location: "Indore", interests: ["Cooking", "Dance"], requested: false, ageNum: 23 },
    { id: 12, name: "Amit Patel", age: "29 Years Old", image: defImg, online: true, location: "Surat", interests: ["Business", "Travel"], requested: false, ageNum: 29 },
    { id: 13, name: "Neha Agarwal", age: "21 Years Old", image: defImg, online: true, location: "Delhi", interests: ["Music", "Dance"], requested: false, ageNum: 21 },
    { id: 14, name: "Kiran Patel", age: "30 Years Old", image: defImg, online: false, location: "Mumbai", interests: ["Reading", "Travel"], requested: false, ageNum: 30 },
    { id: 15, name: "Suresh Kumar", age: "27 Years Old", image: defImg, online: true, location: "Bangalore", interests: ["Sports", "Photography"], requested: false, ageNum: 27 }
  ];

  // Fetch users function
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } catch (err) {
      console.error("Error setting users:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to load profiles. Please try again.",
        icon: "error",
        confirmButtonText: "Retry"
      }).then(() => {
        fetchUsers();
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter users
  const applyFilters = useCallback(() => {
    let filtered = [...users];

    if (searchTerm) {
      filtered = filtered.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filters.online === 'online') {
      filtered = filtered.filter(user => user.online);
    } else if (filters.online === 'offline') {
      filtered = filtered.filter(user => !user.online);
    }

    if (filters.ageRange === '18-24') {
      filtered = filtered.filter(user => user.ageNum >= 18 && user.ageNum <= 24);
    } else if (filters.ageRange === '25-30') {
      filtered = filtered.filter(user => user.ageNum >= 25 && user.ageNum <= 30);
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(user => user.location === filters.location);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, filters, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      online: 'all',
      ageRange: 'all',
      location: 'all'
    });
  };

  const handleChatClick = useCallback((user) => {
    console.log("Chat clicked for user:", user.name);
    navigate("/chat");
  }, [navigate]);

  const handleImageClick = useCallback((user) => {
    console.log("Image clicked for user:", user.name);
    navigate("/view-profile", { state: { user } });
  }, [navigate]);

 const handleViewProfile = useCallback(
    (user) => {
      console.log("View profile clicked for user:", user.name);
      navigate("/view-profile", { state: { user } });
    },
    [navigate]
  );


  const showSubscriptionAlert = useCallback((feature) => {
    Swal.fire({
      title: "Subscription Required",
      text: `${feature} feature is available only for subscribed users.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#df314d",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Subscribe Now",
      cancelButtonText: "Maybe Later"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/pricing-plan");
      }
    });
  }, [navigate]);

  const handleRequest = useCallback((id) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, requested: !user.requested } : user
      )
    );
    setFilteredUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, requested: !user.requested } : user
      )
    );
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const totalPages = Math.ceil(filteredUsers.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const uniqueLocations = [...new Set(users.map(user => user.location))].sort();

  const LoadingSpinner = () => (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Finding perfect matches for you...</p>
    </div>
  );

  return (
    <div className="profile-page">
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Perfect Matches For You</h1>
            <p className="hero-subtitle">Discover amazing people waiting to connect with you</p>
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb-separator">›</span>
              <span className="active">Profiles</span>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-hearts">
            <div className="heart heart-1">💖</div>
            <div className="heart heart-2">💝</div>
            <div className="heart heart-3">💕</div>
          </div>
        </div>
      </section>

      <section className="profiles-section">
        <div className="container">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="search-bar">
                <span className="filter-title-text">Filter Profiles</span>
                <div className="search-controls">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <div className="filter-toggle-wrapper">
                    <button 
                      className="filter-toggle"
                      aria-label="Toggle filters"
                    >
                      <Filter size={20} />
                    </button>
                    <div className="filter-dropdown">
                      <div className="filter-controls">
                        <div className="filter-group">
                          <label>Status</label>
                          <select 
                            value={filters.online} 
                            onChange={(e) => handleFilterChange('online', e.target.value)}
                          >
                            <option value="all">All Users</option>
                            <option value="online">Online Only</option>
                            <option value="offline">Offline Only</option>
                          </select>
                        </div>
                        <div className="filter-group">
                          <label>Age Range</label>
                          <select 
                            value={filters.ageRange} 
                            onChange={(e) => handleFilterChange('ageRange', e.target.value)}
                          >
                            <option value="all">All Ages</option>
                            <option value="18-24">18-24 Years</option>
                            <option value="25-30">25-30 Years</option>
                          </select>
                        </div>
                        <div className="filter-group">
                          <label>Location</label>
                          <select 
                            value={filters.location} 
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                          >
                            <option value="all">All Locations</option>
                            {uniqueLocations.map(location => (
                              <option key={location} value={location}>{location}</option>
                            ))}
                          </select>
                        </div>
                        <button className="clear-filters-btn" onClick={clearFilters}>
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="no-users-container">
                  <User size={64} className="no-users-icon" />
                  <h3>No profiles match your filters</h3>
                  <p>Try adjusting your filter criteria to see more matches!</p>
                  <button className="btn btn-primary" onClick={clearFilters}>
                    <Filter size={16} />
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="cards-grid">
                    {currentUsers.map((user, index) => (
                      <div 
                        key={user.id} 
                        className="card-wrapper"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <UserCard
                          user={user}
                          onChatClick={handleChatClick}
                          onImageClick={handleImageClick}
                          onRequest={handleRequest}
                          onShowAlert={showSubscriptionAlert}
                          onViewProfile={handleViewProfile}
                        />
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="pagination-container">
                      <div className="pagination">
                        <button
                          className={`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft size={18} />
                          <span>Previous</span>
                        </button>

                        <div className="pagination-numbers">
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            const isActive = pageNumber === currentPage;
                            
                            if (
                              pageNumber === 1 ||
                              pageNumber === totalPages ||
                              Math.abs(pageNumber - currentPage) <= 1
                            ) {
                              return (
                                <button
                                  key={pageNumber}
                                  className={`pagination-number ${isActive ? 'active' : ''}`}
                                  onClick={() => goToPage(pageNumber)}
                                >
                                  {pageNumber}
                                </button>
                              );
                            } else if (
                              pageNumber === currentPage - 2 ||
                              pageNumber === currentPage + 2
                            ) {
                              return <span key={pageNumber} className="pagination-dots">...</span>;
                            }
                            return null;
                          })}
                        </div>

                        <button
                          className={`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <span>Next</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                      
                      <div className="pagination-info">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} profiles
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      <div className="floating-animation">
        <div className="floating-heart">💖</div>
      </div>
    </div>
  );
};

export default Profile;