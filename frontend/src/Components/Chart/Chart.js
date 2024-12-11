import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Chart.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Helper function to download a chart as PDF
const downloadPDF = (chartId, title) => {
  const chartElement = document.getElementById(chartId);
  const buttonElement = chartElement.querySelector("button");

  if (buttonElement) buttonElement.style.display = "none";

  html2canvas(chartElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 90);
    pdf.save(`${title}.pdf`);
    if (buttonElement) buttonElement.style.display = "block";
  });
};

// Utility to create consistent chart options
const getChartOptions = (title) => ({
  responsive: true,
  plugins: {
    title: { text: title, display: true, font: { size: 20 } },
  },
  scales: { y: { beginAtZero: true } },
});

// Fetch data from API
const fetchData = async (url, transformData) => {
  try {
    const response = await axios.get(url);
    return transformData(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

// Data transformation functions
const transformChartData = (data) => ({
  labels: data.map((issue) => issue._id),
  datasets: [
    {
      label: "Number of Issues",
      data: data.map((issue) => issue.count),
      backgroundColor: "rgba(255, 0, 0, 1)",
    },
  ],
});

const transformGroupedData = (data) => {
  const issueTypes = [...new Set(data.map((item) => item.issue_type))];
  const statuses = [...new Set(data.map((item) => item.status))];

  const getBackgroundColor = (status) => {
    const colors = {
      Resolved: "rgba(0, 0, 255, 1)",
      "Work In Progress": "rgba(255, 165, 0, 1)",
      Open: "rgba(255, 0, 0, 1)",
    };
    return colors[status] || "rgba(128, 128, 128, 1)";
  };

  const datasets = statuses.map((status) => ({
    label: status,
    data: issueTypes.map((type) => {
      const item = data.find((d) => d.issue_type === type && d.status === status);
      return item ? item.count : 0;
    }),
    backgroundColor: getBackgroundColor(status),
  }));

  return { labels: issueTypes, datasets };
};

const transformComparisonData = (data) => {
  const issueTypes = Object.keys(data);
  return {
    labels: issueTypes,
    datasets: [
      {
        label: "Current Month",
        data: issueTypes.map((type) => data[type].currentMonth),
        backgroundColor: "rgba(0, 123, 255, 1)",
      },
      {
        label: "Previous Month",
        data: issueTypes.map((type) => data[type].previousMonth),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
};

// Chart component
const ChartComponent = ({ chartId, chartData, title }) => (
  <div className="chart" id={chartId} style={{ position: "relative" }}>
    <Bar data={chartData} options={getChartOptions(title)} />
    <button
      onClick={() => downloadPDF(chartId, title)}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "#00008B",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Download PDF
    </button>
  </div>
);

// PropTypes for ChartComponent
ChartComponent.propTypes = {
  chartId: PropTypes.string.isRequired, // chartId must be a string and is required
  chartData: PropTypes.object.isRequired, // chartData must be an object and is required
  title: PropTypes.string.isRequired, // title must be a string and is required
};

// Main Chart component
function Chart() {
  const [chartData, setChartData] = useState(null);
  const [groupedData, setGroupedData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);

  // Fetch chart data
  useEffect(() => {
    fetchData("http://localhost:5000/api/issues/count-by-type", transformChartData).then(setChartData);
  }, []);

  // Fetch grouped data
  useEffect(() => {
    fetchData("http://localhost:5000/api/issues/count-by-type-and-status", transformGroupedData).then(setGroupedData);
  }, []);

  // Fetch comparison data
  useEffect(() => {
    fetchData("http://localhost:5000/api/issues/count-by-month", transformComparisonData).then(setComparisonData);
  }, []);

  return (
    <div>
      <Header />
      <div className="chart-container">
        {chartData ? (
          <ChartComponent chartId="chart1" chartData={chartData} title="All Issues by Type" />
        ) : (
          <p className="loading">Loading data...</p>
        )}
      </div>
      <div className="chart-container">
        {groupedData ? (
          <ChartComponent chartId="chart2" chartData={groupedData} title="All Issue Status by Issue Type" />
        ) : (
          <p className="loading">Loading data...</p>
        )}
      </div>
      <div className="chart-container">
        {comparisonData ? (
          <ChartComponent chartId="chart3" chartData={comparisonData} title="Comparison of Issues (Current vs Previous Month)" />
        ) : (
          <p className="loading">Loading data...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Chart;
