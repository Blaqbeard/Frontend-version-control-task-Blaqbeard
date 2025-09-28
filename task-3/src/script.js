// My Analytics Dashboard - Built with passion for clean code

class AnalyticsDashboard {
  constructor() {
    this.isLoading = true;
    this.chartData = null;
    this.init();
  }

  //  initialization method -
  init() {
    this.setupEventListeners();
    this.animateCounters();
    this.createChart();
    this.simulateRealTimeUpdates();
    this.hideLoading();
  }

  // Set up all event listeners
  setupEventListeners() {
    // Navigation links - Let them work naturally for page navigation
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", (e) => {
        // Only prevent default for non-navigation links (like Settings)
        if (link.getAttribute("href") === "#") {
          e.preventDefault();
        }
        // Let the browser handle the navigation for actual page links
      });
    });

    // Export button
    const exportBtn = document.querySelector(".btn--primary");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => this.exportData());
    }

    // Time period selector
    const timeSelector = document.querySelector(".select");
    if (timeSelector) {
      timeSelector.addEventListener("change", (e) => {
        this.updateChartData(e.target.value);
      });
    }

    // Window resize handler
    window.addEventListener("resize", () => {
      this.handleResize();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      this.handleKeyboardNavigation(e);
    });
  }

  // Handle navigation between sections
  handleNavigation(activeLink) {
    // Remove active class from all links
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to clicked link
    activeLink.classList.add("active");

    // Add smooth transition effect
    activeLink.style.transform = "scale(0.95)";
    setTimeout(() => {
      activeLink.style.transform = "scale(1)";
    }, 150);
  }

  // Animate counter numbers
  animateCounters() {
    const counters = document.querySelectorAll(".card__value");

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          // Format number with commas for large numbers
          const formattedNumber = Math.floor(current).toLocaleString();
          counter.textContent = counter.textContent.includes("₦")
            ? `₦${formattedNumber}`
            : formattedNumber;
          requestAnimationFrame(updateCounter);
        } else {
          // Ensure we end with the exact target value
          const formattedTarget = target.toLocaleString();
          counter.textContent = counter.textContent.includes("₦")
            ? `₦${formattedTarget}`
            : formattedTarget;
        }
      };

      // Start animation after a small delay for better UX
      setTimeout(updateCounter, 300);
    });
  }

  // Create the revenue chart using Canvas API
  createChart() {
    const canvas = document.getElementById("revenueChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    // Set canvas size to match display size
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Sample data for the chart
    this.chartData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      maxValue: 30000,
    };

    this.drawChart(
      ctx,
      canvas.width / window.devicePixelRatio,
      canvas.height / window.devicePixelRatio
    );
  }

  // Draw the chart on canvas
  drawChart(ctx, width, height) {
    const { labels, values, maxValue } = this.chartData;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= labels.length; i++) {
      const x = padding + (chartWidth / labels.length) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + chartHeight);
      ctx.stroke();
    }

    // Draw the line chart
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 3;
    ctx.beginPath();

    values.forEach((value, index) => {
      const x = padding + (chartWidth / (labels.length - 1)) * index;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw data points
    ctx.fillStyle = "#6366f1";
    values.forEach((value, index) => {
      const x = padding + (chartWidth / (labels.length - 1)) * index;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = "#64748b";
    ctx.font = "14px Inter, sans-serif";
    ctx.textAlign = "center";

    labels.forEach((label, index) => {
      const x = padding + (chartWidth / (labels.length - 1)) * index;
      const y = height - 10;
      ctx.fillText(label, x, y);
    });

    // Draw value labels on the left
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 5;
      ctx.fillText(value.toLocaleString(), padding - 10, y);
    }
  }

  // Update chart data based on time period
  updateChartData(period) {
    // Simulate different data based on time period
    const dataSets = {
      "Last 7 days": {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        maxValue: 30000,
      },
      "Last 30 days": {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        values: [85000, 92000, 78000, 95000],
        maxValue: 100000,
      },
      "Last 3 months": {
        labels: ["Month 1", "Month 2", "Month 3"],
        values: [320000, 380000, 420000],
        maxValue: 450000,
      },
    };

    this.chartData = dataSets[period] || dataSets["Last 7 days"];
    this.createChart();
  }

  // Simulate real-time updates
  simulateRealTimeUpdates() {
    // Update stats every 30 seconds
    setInterval(() => {
      this.updateStats();
    }, 30000);

    // Add new activity rows every 2 minutes
    setInterval(() => {
      this.addNewActivity();
    }, 120000);
  }

  // Update stats with new values
  updateStats() {
    const statsCards = document.querySelectorAll(".stats__card");

    statsCards.forEach((card) => {
      const valueElement = card.querySelector(".card__value");
      const currentValue = parseInt(
        valueElement.textContent.replace(/[₦,]/g, "")
      );
      const newValue = currentValue + Math.floor(Math.random() * 100);

      // Animate the update
      this.animateValueChange(valueElement, currentValue, newValue);
    });
  }

  // Animate value changes
  animateValueChange(element, from, to) {
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = Math.floor(from + (to - from) * progress);
      const formattedValue = currentValue.toLocaleString();

      element.textContent = element.textContent.includes("₦")
        ? `₦${formattedValue}`
        : formattedValue;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  // Add new activity to the table
  addNewActivity() {
    const tableBody = document.querySelector(".table tbody");
    if (!tableBody) return;

    const activities = [
      {
        user: "Aisha Mohammed",
        action: "Completed purchase",
        time: "Just now",
        status: "success",
      },
      {
        user: "Emeka Nwosu",
        action: "Updated profile",
        time: "1 minute ago",
        status: "info",
      },
      {
        user: "Zainab Abdullahi",
        action: "Logged in",
        time: "2 minutes ago",
        status: "success",
      },
      {
        user: "Tunde Adebayo",
        action: "Made a refund",
        time: "3 minutes ago",
        status: "warning",
      },
    ];

    const randomActivity =
      activities[Math.floor(Math.random() * activities.length)];

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>
        <div class="user__info">
          <div class="user__avatar--small">
            <i class="fas fa-user"></i>
          </div>
          <span>${randomActivity.user}</span>
        </div>
      </td>
      <td>${randomActivity.action}</td>
      <td>${randomActivity.time}</td>
      <td><span class="status status--${randomActivity.status}">${
      randomActivity.status === "success"
        ? "Completed"
        : randomActivity.status === "info"
        ? "Pending"
        : "Active"
    }</span></td>
    `;

    // Add animation class
    newRow.style.opacity = "0";
    newRow.style.transform = "translateY(-20px)";

    // Insert at the top
    tableBody.insertBefore(newRow, tableBody.firstChild);

    // Animate in
    setTimeout(() => {
      newRow.style.transition = "all 0.3s ease-out";
      newRow.style.opacity = "1";
      newRow.style.transform = "translateY(0)";
    }, 100);

    // Remove old rows if there are too many
    const rows = tableBody.querySelectorAll("tr");
    if (rows.length > 10) {
      const lastRow = rows[rows.length - 1];
      lastRow.style.transition = "all 0.3s ease-out";
      lastRow.style.opacity = "0";
      lastRow.style.transform = "translateY(20px)";

      setTimeout(() => {
        lastRow.remove();
      }, 300);
    }
  }

  // Export data functionality
  exportData() {
    // Create a simple CSV export
    const csvData = [
      ["Metric", "Value", "Change"],
      ["Total Users", "12,543", "+12.5%"],
      ["Revenue", "₦89,432", "+8.2%"],
      ["Orders", "3,421", "-2.1%"],
      ["Growth", "23.7%", "+5.3%"],
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "analytics-dashboard-export.csv";
    link.click();

    window.URL.revokeObjectURL(url);
  }

  // Handle window resize
  handleResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.createChart();
    }, 250);
  }

  // Handle keyboard navigation
  handleKeyboardNavigation(e) {
    // ESC key to close any open modals or overlays
    if (e.key === "Escape") {
      this.hideLoading();
    }

    // Tab navigation enhancement
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  }

  // Hide loading overlay
  hideLoading() {
    const loading = document.getElementById("loading");
    if (loading) {
      setTimeout(() => {
        loading.style.opacity = "0";
        loading.style.visibility = "hidden";
        this.isLoading = false;
      }, 1500);
    }
  }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add loading class to body
  document.body.classList.add("loading");

  // Initialize dashboard
  const dashboard = new AnalyticsDashboard();

  // Remove loading class after initialization
  setTimeout(() => {
    document.body.classList.remove("loading");
  }, 2000);
});

// Add some CSS for keyboard navigation
const style = document.createElement("style");
style.textContent = `
  .keyboard-navigation *:focus {
    outline: 2px solid #6366f1 !important;
    outline-offset: 2px !important;
  }
  
  .loading {
    overflow: hidden;
  }
`;
document.head.appendChild(style);
