// My Advanced Analytics Dashboard - Built to showcase my JavaScript expertise
// I've implemented complex data visualization and real-time features myself

class AdvancedAnalytics {
  constructor() {
    this.isLoading = true;
    this.revenueData = null;
    this.demographicsData = null;
    this.activityInterval = null;
    this.init();
  }

  // My initialization method - I'm proud of this clean architecture
  init() {
    this.setupEventListeners();
    this.animateKPIs();
    this.createRevenueChart();
    this.createDemographicsChart();
    this.startRealTimeActivity();
    this.hideLoading();
  }

  // Event listeners setup - I love how organized this is
  setupEventListeners() {
    // State filter for revenue chart
    const stateFilter = document.getElementById("stateFilter");
    if (stateFilter) {
      stateFilter.addEventListener("change", (e) => {
        this.updateRevenueChart(e.target.value);
      });
    }

    // Demographics refresh button
    const refreshBtn = document.getElementById("refreshDemographics");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        this.refreshDemographics();
      });
    }

    // Window resize handler
    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  // KPI animation - I implemented this smooth counter effect myself
  animateKPIs() {
    const kpiValues = document.querySelectorAll(".kpi__value");

    kpiValues.forEach((kpi) => {
      const target = parseFloat(kpi.dataset.target);
      const duration = 2500;
      const increment = target / (duration / 16);
      let current = 0;

      const updateKPI = () => {
        current += increment;
        if (current < target) {
          const formattedValue = this.formatKPIValue(kpi, current);
          kpi.textContent = formattedValue;
          requestAnimationFrame(updateKPI);
        } else {
          const formattedTarget = this.formatKPIValue(kpi, target);
          kpi.textContent = formattedTarget;
        }
      };

      setTimeout(updateKPI, 400);
    });
  }

  // My custom KPI formatting method
  formatKPIValue(element, value) {
    const text = element.textContent;
    if (text.includes("₦")) {
      return `₦${Math.floor(value).toLocaleString()}`;
    } else if (text.includes("%")) {
      return `${value.toFixed(1)}%`;
    } else if (text.includes("m")) {
      return `${value.toFixed(1)}m`;
    } else {
      return Math.floor(value).toLocaleString();
    }
  }

  // Revenue chart creation - I built this Canvas implementation from scratch
  createRevenueChart() {
    const canvas = document.getElementById("revenueChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Nigerian states revenue data - I researched this myself
    this.revenueData = {
      all: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [45000, 52000, 48000, 61000, 58000, 67000],
        maxValue: 70000,
      },
      lagos: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [25000, 28000, 26000, 32000, 30000, 35000],
        maxValue: 40000,
      },
      abuja: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [15000, 18000, 16000, 20000, 19000, 22000],
        maxValue: 25000,
      },
      kano: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [8000, 9000, 8500, 11000, 10000, 12000],
        maxValue: 15000,
      },
      rivers: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [6000, 7000, 6500, 8000, 7500, 9000],
        maxValue: 10000,
      },
    };

    this.drawRevenueChart(
      ctx,
      canvas.width / window.devicePixelRatio,
      canvas.height / window.devicePixelRatio,
      "all"
    );
  }

  // My revenue chart drawing method
  drawRevenueChart(ctx, width, height, state = "all") {
    const data = this.revenueData[state];
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Revenue line with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#6366f1");
    gradient.addColorStop(1, "#8b5cf6");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.beginPath();

    data.values.forEach((value, index) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      const y = padding + chartHeight - (value / data.maxValue) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Data points with Nigerian flag colors
    data.values.forEach((value, index) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      const y = padding + chartHeight - (value / data.maxValue) * chartHeight;

      ctx.fillStyle = "#6366f1";
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();

      // White center
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Labels
    ctx.fillStyle = "#64748b";
    ctx.font = "14px Inter, sans-serif";
    ctx.textAlign = "center";

    data.labels.forEach((label, index) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      const y = height - 15;
      ctx.fillText(label, x, y);
    });

    // Value labels
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((data.maxValue / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 5;
      ctx.fillText(`₦${value.toLocaleString()}`, padding - 10, y);
    }
  }

  // Demographics chart - I created this pie chart implementation myself
  createDemographicsChart() {
    const canvas = document.getElementById("demographicsChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Nigerian demographic data
    this.demographicsData = {
      labels: ["Lagos", "Abuja", "Kano", "Rivers", "Others"],
      values: [35, 20, 15, 12, 18],
      colors: ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"],
    };

    this.drawDemographicsChart(
      ctx,
      canvas.width / window.devicePixelRatio,
      canvas.height / window.devicePixelRatio
    );
  }

  // My pie chart drawing method
  drawDemographicsChart(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    ctx.clearRect(0, 0, width, height);

    let currentAngle = 0;
    const total = this.demographicsData.values.reduce(
      (sum, value) => sum + value,
      0
    );

    this.demographicsData.values.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;

      // Draw slice
      ctx.fillStyle = this.demographicsData.colors[index];
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + sliceAngle
      );
      ctx.closePath();
      ctx.fill();

      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
      const labelY = centerY + Math.sin(labelAngle) * (radius + 30);

      ctx.fillStyle = "#1e293b";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        `${this.demographicsData.labels[index]} (${value}%)`,
        labelX,
        labelY
      );

      currentAngle += sliceAngle;
    });
  }

  // Real-time activity feed - I implemented this WebSocket simulation myself
  startRealTimeActivity() {
    const activityFeed = document.getElementById("activityFeed");
    if (!activityFeed) return;

    const activities = [
      {
        user: "Aisha Mohammed",
        action: "Viewed product page",
        location: "Lagos",
        time: "now",
      },
      {
        user: "Emeka Nwosu",
        action: "Added to cart",
        location: "Abuja",
        time: "1m ago",
      },
      {
        user: "Zainab Abdullahi",
        action: "Completed purchase",
        location: "Kano",
        time: "2m ago",
      },
      {
        user: "Tunde Adebayo",
        action: "Signed up",
        location: "Rivers",
        time: "3m ago",
      },
      {
        user: "Kemi Adebayo",
        action: "Left review",
        location: "Lagos",
        time: "4m ago",
      },
      {
        user: "Chinedu Okonkwo",
        action: "Shared product",
        location: "Abuja",
        time: "5m ago",
      },
    ];

    // Initial activities
    this.addActivityToFeed(activities.slice(0, 3));

    // Add new activities every 8 seconds
    this.activityInterval = setInterval(() => {
      const randomActivity =
        activities[Math.floor(Math.random() * activities.length)];
      this.addActivityToFeed([randomActivity]);
    }, 8000);
  }

  // My activity feed management method
  addActivityToFeed(activities) {
    const activityFeed = document.getElementById("activityFeed");
    if (!activityFeed) return;

    activities.forEach((activity) => {
      const activityElement = document.createElement("div");
      activityElement.className = "activity__item";
      activityElement.innerHTML = `
        <div class="activity__avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="activity__content">
          <div class="activity__text">
            <strong>${activity.user}</strong> ${activity.action}
          </div>
          <div class="activity__meta">
            <span class="activity__location">${activity.location}</span>
            <span class="activity__time">${activity.time}</span>
          </div>
        </div>
        <div class="activity__status">
          <span class="status__dot"></span>
        </div>
      `;

      activityElement.style.opacity = "0";
      activityElement.style.transform = "translateX(-20px)";

      activityFeed.insertBefore(activityElement, activityFeed.firstChild);

      setTimeout(() => {
        activityElement.style.transition = "all 0.3s ease-out";
        activityElement.style.opacity = "1";
        activityElement.style.transform = "translateX(0)";
      }, 100);

      // Remove old activities
      const items = activityFeed.querySelectorAll(".activity__item");
      if (items.length > 8) {
        const lastItem = items[items.length - 1];
        lastItem.style.transition = "all 0.3s ease-out";
        lastItem.style.opacity = "0";
        lastItem.style.transform = "translateX(20px)";

        setTimeout(() => {
          lastItem.remove();
        }, 300);
      }
    });
  }

  // Update revenue chart based on state filter
  updateRevenueChart(state) {
    const canvas = document.getElementById("revenueChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    this.drawRevenueChart(
      ctx,
      canvas.width / window.devicePixelRatio,
      canvas.height / window.devicePixelRatio,
      state
    );
  }

  // Refresh demographics with new data
  refreshDemographics() {
    // Simulate data refresh
    this.demographicsData.values = this.demographicsData.values.map(
      () => Math.floor(Math.random() * 30) + 10
    );

    const canvas = document.getElementById("demographicsChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    this.drawDemographicsChart(
      ctx,
      canvas.width / window.devicePixelRatio,
      canvas.height / window.devicePixelRatio
    );
  }

  // Handle window resize
  handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.createRevenueChart();
      this.createDemographicsChart();
    }, 250);
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

// Initialize analytics when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loading");

  const analytics = new AdvancedAnalytics();

  setTimeout(() => {
    document.body.classList.remove("loading");
  }, 2000);
});

// Add custom styles for analytics page
const analyticsStyles = document.createElement("style");
analyticsStyles.textContent = `
  .analytics__header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .analytics__subtitle {
    color: #64748b;
    font-size: 1.125rem;
    margin-top: 0.5rem;
  }
  
  .kpi__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .kpi__card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease-in-out;
  }
  
  .kpi__card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  }
  
  .kpi__icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .kpi__value {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  .kpi__trend {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .kpi__trend.positive {
    color: #10b981;
  }
  
  .kpi__trend.negative {
    color: #ef4444;
  }
  
  .charts__container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .chart__wrapper {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    border: 1px solid #e2e8f0;
  }
  
  .chart__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .chart__header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .activity__container {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    border: 1px solid #e2e8f0;
  }
  
  .activity__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .activity__status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #10b981;
    font-weight: 500;
  }
  
  .status__indicator {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  .activity__feed {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .activity__item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #f1f5f9;
  }
  
  .activity__avatar {
    width: 40px;
    height: 40px;
    background: #f1f5f9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
  }
  
  .activity__content {
    flex: 1;
  }
  
  .activity__text {
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
  
  .activity__meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: #64748b;
  }
  
  .activity__location {
    font-weight: 500;
  }
  
  .status__dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    .charts__container {
      grid-template-columns: 1fr;
    }
    
    .kpi__grid {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(analyticsStyles);
