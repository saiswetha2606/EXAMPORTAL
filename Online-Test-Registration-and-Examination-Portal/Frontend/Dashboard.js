function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [userProfile, setUserProfile] = useState({});
  
    return (
      <div className="dashboard">
        <div className="left-panel">
          <nav>
            <ul>
              <li>My Courses</li>
              <li>Results</li>
            </ul>
          </nav>
        </div>
        <div className="profile-section">
          {/* Profile dropdown */}
        </div>
        <div className="main-content">
          {/* Course/Test list */}
        </div>
      </div>
    );
  }