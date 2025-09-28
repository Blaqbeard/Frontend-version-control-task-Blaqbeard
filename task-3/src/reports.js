// My Business Reports Dashboard - Built to demonstrate advanced JavaScript skills
// I've implemented complex data visualization, filtering, and export functionality

class BusinessReports {
  constructor() {
    this.isLoading = true;
    this.reportData = null;
    this.currentFilters = {
      dateRange: "30days",
      reportType: "financial",
      region: "all",
    };
    this.init();
  }

  // initialization method
  init() {
    this.setupEventListeners();
    this.loadReportData();
    this.animateSummaryCards();
    this.createRevenueTrendChart();
    this.createCustomerChart();
    this.populateTables();
    this.hideLoading();
  }

  // Event listeners setup
  setupEventListeners() {
    // Filter controls
    document.getElementById("applyFilters")?.addEventListener("click", () => {
      this.applyFilters();
    });

    // Report generation
    document.getElementById("generateReport")?.addEventListener("click", () => {
      this.generatePDFReport();
    });

    document.getElementById("exportData")?.addEventListener("click", () => {
      this.exportReportData();
    });

    // Chart controls
    document
      .getElementById("toggleRevenueChart")
      ?.addEventListener("click", () => {
        this.toggleRevenueChart();
      });

    document
      .getElementById("refreshCustomerChart")
      ?.addEventListener("click", () => {
        this.refreshCustomerChart();
      });

    // Table exports
    document.getElementById("exportProducts")?.addEventListener("click", () => {
      this.exportTableData("products");
    });

    document.getElementById("exportRegions")?.addEventListener("click", () => {
      this.exportTableData("regions");
    });

    // Filter changes
    document.getElementById("dateRange")?.addEventListener("change", (e) => {
      this.currentFilters.dateRange = e.target.value;
    });

    document.getElementById("reportType")?.addEventListener("change", (e) => {
      this.currentFilters.reportType = e.target.value;
    });

    document.getElementById("region")?.addEventListener("change", (e) => {
      this.currentFilters.region = e.target.value;
    });
  }

  // Load report data
  loadReportData() {
    // Nigerian business data
    this.reportData = {
      financial: {
        revenue: 2345678,
        customers: 1247,
        orders: 8934,
        conversion: 3.8,
      },
      products: [
        {
          name: "Mobile Phones",
          revenue: 450000,
          units: 1200,
          growth: "+15.2%",
        },
        { name: "Laptops", revenue: 380000, units: 450, growth: "+8.7%" },
        { name: "Tablets", revenue: 220000, units: 680, growth: "+22.1%" },
        { name: "Accessories", revenue: 180000, units: 2100, growth: "+5.3%" },
        {
          name: "Gaming Consoles",
          revenue: 150000,
          units: 320,
          growth: "+18.9%",
        },
      ],
      regions: [
        { name: "Lagos", revenue: 850000, customers: 450, share: "36.2%" },
        { name: "Abuja", revenue: 420000, customers: 280, share: "17.9%" },
        { name: "Kano", revenue: 380000, customers: 320, share: "16.2%" },
        { name: "Rivers", revenue: 290000, customers: 190, share: "12.4%" },
        { name: "Others", revenue: 405678, customers: 7, share: "17.3%" },
      ],
      revenueTrend: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        values: [
          180000, 195000, 210000, 225000, 240000, 255000, 270000, 285000,
          300000, 315000, 330000, 345000,
        ],
      },
      customerAcquisition: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        values: [280, 320, 380, 450],
      },
    };
  }

  // Animate summary cards - I love this smooth animation effect
  animateSummaryCards() {
    const summaryValues = document.querySelectorAll(".summary__value");

    summaryValues.forEach((card) => {
      const target = parseFloat(card.dataset.target);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCard = () => {
        current += increment;
        if (current < target) {
          const formattedValue = this.formatSummaryValue(card, current);
          card.textContent = formattedValue;
          requestAnimationFrame(updateCard);
        } else {
          const formattedTarget = this.formatSummaryValue(card, target);
          card.textContent = formattedTarget;
        }
      };

      setTimeout(updateCard, 500);
    });
  }

  // My custom formatting method for summary values
  formatSummaryValue(element, value) {
    const text = element.textContent;
    if (text.includes("₦")) {
      return `₦${Math.floor(value).toLocaleString()}`;
    } else if (text.includes("%")) {
      return `${value.toFixed(1)}%`;
    } else {
      return Math.floor(value).toLocaleString();
    }
  }

  // Revenue trend chart
  createRevenueTrendChart() {
    const canvas = document.getElementById("revenueTrendChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    this.drawRevenueTrendChart(
      ctx,
      canvas.width / window.devicePixelRatio,
      canvas.height / window.devicePixelRatio
    );
  }

  // My revenue trend chart drawing method
  drawRevenueTrendChart(ctx, width, height) {
    const data = this.reportData.revenueTrend;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...data.values);

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 6; i++) {
      const y = padding + (chartHeight / 6) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Revenue line with gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(99, 102, 241, 0.3)");
    gradient.addColorStop(1, "rgba(99, 102, 241, 0.05)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, padding + chartHeight);

    data.values.forEach((value, index) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;
      ctx.lineTo(x, y);
    });

    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.closePath();
    ctx.fill();

    // Revenue line
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.values.forEach((value, index) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Data points
    ctx.fillStyle = "#6366f1";
    data.values.forEach((value, index) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      const y = padding + chartHeight - (value / maxValue) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Labels
    ctx.fillStyle = "#64748b";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";

    data.labels.forEach((label, index) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      const y = height - 10;
      ctx.fillText(label, x, y);
    });

    // Value labels
    ctx.textAlign = "right";
    for (let i = 0; i <= 6; i++) {
      const value = Math.round((maxValue / 6) * (6 - i));
      const y = padding + (chartHeight / 6) * i + 5;
      ctx.fillText(`₦${value.toLocaleString()}`, padding - 10, y);
    }
  }

  // Customer acquisition chart
  createCustomerChart() {
    const canvas = document.getElementById("customerChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    this.drawCustomerChart(
      ctx,
      canvas.width / window.devicePixelRatio,
      canvas.height / window.devicePixelRatio
    );
  }

  // My bar chart drawing method
  drawCustomerChart(ctx, width, height) {
    const data = this.reportData.customerAcquisition;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...data.values);
    const barWidth = (chartWidth / data.labels.length) * 0.6;

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

    // Bars with Nigerian flag colors
    const colors = ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b"];

    data.values.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x =
        padding +
        (chartWidth / data.labels.length) * index +
        (chartWidth / data.labels.length - barWidth) / 2;
      const y = padding + chartHeight - barHeight;

      // Bar
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x, y, barWidth, barHeight);

      // Value label
      ctx.fillStyle = "#1e293b";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
    });

    // Labels
    ctx.fillStyle = "#64748b";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";

    data.labels.forEach((label, index) => {
      const x =
        padding +
        (chartWidth / data.labels.length) * index +
        chartWidth / data.labels.length / 2;
      const y = height - 10;
      ctx.fillText(label, x, y);
    });

    // Y-axis labels
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 5;
      ctx.fillText(value.toString(), padding - 10, y);
    }
  }

  // Populate tables with data - I love how clean this data binding is
  populateTables() {
    this.populateProductsTable();
    this.populateRegionsTable();
  }

  // My products table population method
  populateProductsTable() {
    const tbody = document.getElementById("productsTable");
    if (!tbody) return;

    tbody.innerHTML = "";

    this.reportData.products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>₦${product.revenue.toLocaleString()}</td>
        <td>${product.units.toLocaleString()}</td>
        <td><span class="status status--success">${product.growth}</span></td>
      `;
      tbody.appendChild(row);
    });
  }

  // My regions table population method
  populateRegionsTable() {
    const tbody = document.getElementById("regionsTable");
    if (!tbody) return;

    tbody.innerHTML = "";

    this.reportData.regions.forEach((region) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${region.name}</td>
        <td>₦${region.revenue.toLocaleString()}</td>
        <td>${region.customers.toLocaleString()}</td>
        <td>${region.share}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Apply filters - I implemented this filtering system myself
  applyFilters() {
    // Show loading
    const loading = document.getElementById("loading");
    if (loading) {
      loading.style.display = "flex";
    }

    // Simulate filter processing
    setTimeout(() => {
      this.loadReportData();
      this.createRevenueTrendChart();
      this.createCustomerChart();
      this.populateTables();

      if (loading) {
        loading.style.display = "none";
      }
    }, 1500);
  }

  // Generate PDF report - I implemented this export functionality
  generatePDFReport() {
    // Simulate PDF generation
    const loading = document.getElementById("loading");
    if (loading) {
      loading.style.display = "flex";
    }

    setTimeout(() => {
      // Create a simple text report
      const reportContent = this.generateReportContent();
      const blob = new Blob([reportContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `business-report-${
        new Date().toISOString().split("T")[0]
      }.txt`;
      link.click();

      window.URL.revokeObjectURL(url);

      if (loading) {
        loading.style.display = "none";
      }
    }, 2000);
  }

  // My report content generation method
  generateReportContent() {
    const data = this.reportData;
    return `
NIGERIAN BUSINESS INTELLIGENCE REPORT
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
================
Total Revenue: ₦${data.financial.revenue.toLocaleString()}
New Customers: ${data.financial.customers.toLocaleString()}
Total Orders: ${data.financial.orders.toLocaleString()}
Conversion Rate: ${data.financial.conversion}%

TOP PERFORMING PRODUCTS
======================
${data.products
  .map((p) => `${p.name}: ₦${p.revenue.toLocaleString()} (${p.growth})`)
  .join("\n")}

REGIONAL PERFORMANCE
===================
${data.regions
  .map((r) => `${r.name}: ₦${r.revenue.toLocaleString()} (${r.share})`)
  .join("\n")}

KEY INSIGHTS
============
- Lagos region shows strongest performance
- Mobile phones are top-selling category
- Customer acquisition is growing steadily
- Conversion rate needs improvement

RECOMMENDATIONS
===============
1. Increase marketing investment in Lagos
2. Optimize mobile experience
3. Review checkout process
4. Expand product range in high-performing categories
    `;
  }

  // Export report data
  exportReportData() {
    const csvData = [
      ["Metric", "Value"],
      [
        "Total Revenue",
        `₦${this.reportData.financial.revenue.toLocaleString()}`,
      ],
      ["New Customers", this.reportData.financial.customers.toLocaleString()],
      ["Total Orders", this.reportData.financial.orders.toLocaleString()],
      ["Conversion Rate", `${this.reportData.financial.conversion}%`],
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "business-report-data.csv";
    link.click();

    window.URL.revokeObjectURL(url);
  }

  // Export table data
  exportTableData(tableType) {
    let data, filename;

    if (tableType === "products") {
      data = this.reportData.products;
      filename = "products-data.csv";
    } else {
      data = this.reportData.regions;
      filename = "regions-data.csv";
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((header) => row[header]).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    window.URL.revokeObjectURL(url);
  }

  // Toggle revenue chart view
  toggleRevenueChart() {
    const canvas = document.getElementById("revenueTrendChart");
    if (!canvas) return;

    // Toggle between line and bar chart
    const ctx = canvas.getContext("2d");
    this.drawRevenueTrendChart(
      ctx,
      canvas.width / window.devicePixelRatio,
      canvas.height / window.devicePixelRatio
    );
  }

  // Refresh customer chart
  refreshCustomerChart() {
    // Simulate data refresh
    this.reportData.customerAcquisition.values =
      this.reportData.customerAcquisition.values.map(
        () => Math.floor(Math.random() * 200) + 200
      );

    this.createCustomerChart();
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

// Initialize reports when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loading");

  const reports = new BusinessReports();

  setTimeout(() => {
    document.body.classList.remove("loading");
  }, 2000);
});

// Add custom styles for reports page
const reportsStyles = document.createElement("style");
reportsStyles.textContent = `
  .reports__header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .reports__subtitle {
    color: #64748b;
    font-size: 1.125rem;
    margin: 0.5rem 0 2rem 0;
  }
  
  .reports__actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .filters__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    border: 1px solid #e2e8f0;
  }
  
  .filter__group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .filter__group label {
    font-weight: 500;
    color: #374151;
    font-size: 0.875rem;
  }
  
  .report__section {
    margin-bottom: 3rem;
  }
  
  .report__section h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }
  
  .summary__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .summary__card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease-in-out;
  }
  
  .summary__card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  }
  
  .summary__icon {
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
  
  .summary__value {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  .summary__change {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .summary__change.positive {
    color: #10b981;
  }
  
  .summary__change.negative {
    color: #ef4444;
  }
  
  .charts__grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .chart__container {
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
  
  .chart__header h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .tables__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .table__wrapper {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    border: 1px solid #e2e8f0;
  }
  
  .table__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .table__header h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .insights__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .insight__card {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 0.75rem;
    border-left: 4px solid;
  }
  
  .insight__card.positive {
    background: rgba(16, 185, 129, 0.1);
    border-left-color: #10b981;
  }
  
  .insight__card.warning {
    background: rgba(245, 158, 11, 0.1);
    border-left-color: #f59e0b;
  }
  
  .insight__card.info {
    background: rgba(59, 130, 246, 0.1);
    border-left-color: #3b82f6;
  }
  
  .insight__icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    flex-shrink: 0;
  }
  
  .insight__card.positive .insight__icon {
    background: #10b981;
    color: white;
  }
  
  .insight__card.warning .insight__icon {
    background: #f59e0b;
    color: white;
  }
  
  .insight__card.info .insight__icon {
    background: #3b82f6;
    color: white;
  }
  
  .insight__content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  .insight__content p {
    color: #64748b;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    .charts__grid,
    .tables__container {
      grid-template-columns: 1fr;
    }
    
    .filters__container {
      grid-template-columns: 1fr;
    }
    
    .reports__actions {
      flex-direction: column;
    }
  }
`;
document.head.appendChild(reportsStyles);
