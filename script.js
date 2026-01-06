// script.js - إدارة البلاغات والأفكار للموقع

document.addEventListener("DOMContentLoaded", function () {
  // جلب جميع البلاغات من التخزين المحلي
  const reportsContainer = document.getElementById("reportsContainer");

  function loadReports() {
    const reports = JSON.parse(localStorage.getItem("reports")) || [];

    if (!reportsContainer) return;

    if (reports.length === 0) {
      reportsContainer.innerHTML = '<p class="empty-state">لا توجد بلاغات حالياً</p>';
      return;
    }

    reportsContainer.innerHTML = reports
      .map((report) => {
        return `
        <div class="report-card ${report.type}">
          <div class="report-header">
            <span class="report-type">${report.type === 'problem' ? '🔧 مشكلة' : '💡 فكرة'}</span>
          </div>
          <div class="report-info">
            <p><strong>الطالب:</strong> ${report.student_name}</p>
            <p><strong>الصف:</strong> ${report.grade} - ${report.section}</p>
          </div>
          <div class="report-description">
            <p>${report.description}</p>
          </div>
          ${report.solution_idea ? `
            <div class="solution-idea">
              <strong>اقتراح الحل:</strong>
              <p>${report.solution_idea}</p>
            </div>
          ` : ''}
          ${report.image_url ? `
            <div class="report-image">
              <img src="${report.image_url}" alt="صورة البلاغ">
            </div>
          ` : ''}
          <div class="report-footer">
            <small>${new Date(report.created_at).toLocaleString('ar-SA')}</small>
          </div>
        </div>
      `;
      })
      .join("");
  }

  loadReports();

  // تحديث البلاغات كل 5 ثواني تلقائياً
  setInterval(loadReports, 5000);
});