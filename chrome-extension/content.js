function convertTimeToMinutes(timeString) {
    const hours = timeString.match(/(\d+)\s*h/);
    const minutes = timeString.match(/(\d+)\s*m/);

    let totalMinutes = 0;
    if (hours) totalMinutes += parseInt(hours[1]) * 60;
    if (minutes) totalMinutes += parseInt(minutes[1]);

    return totalMinutes;
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}

function createTimeDisplay(activePanel, totalMinutes) {
    const timeDisplay = document.createElement('div');
    timeDisplay.id = 'udemy-time-display';
    timeDisplay.innerHTML = `
        <div class="time-container">
            <h3>Section Time Remaining</h3>
            <p>${formatTime(totalMinutes)}</p>
        </div>
    `;

    const parentElement = activePanel.parentElement;
    const targetElement = parentElement.querySelector(".ud-accordion-panel-toggler");

    if (targetElement) {
        targetElement.append(timeDisplay);
    }
}

function updateUdemyTimeDisplay(activePanel, remainingMinutes) {
    const parentElement = activePanel.parentElement;
    const targetElement = parentElement.querySelector(".ud-accordion-panel-toggler .ud-text-xs.section--progress--hWZfz span");

    if (targetElement) {
        const previousText = targetElement.textContent;
        targetElement.textContent = `${previousText} | Remaining: ${formatTime(remainingMinutes)}`;
    }
}

let lastRemainingMinutes = 0;

function extractCourseTime() {
    let totalMinutes = 0;
    let watchedMinutes = 0;
    let remainingMinutes = 0;
    
    const activePanel = document.querySelector('.accordion-panel-module--content-wrapper--TkHqe[aria-hidden="false"]');

    if (activePanel) {
        const curriculumItems = activePanel.querySelectorAll(".curriculum-item-link--curriculum-item--OVP5S");

        for (const element of curriculumItems) {
            const checkbox = element.querySelector("input[type='checkbox']");
            const timeElement = element.querySelector(".ud-text-xs.curriculum-item-link--metadata--XK804 span");

            if (timeElement) {
                const timeText = timeElement.textContent;
                const time = convertTimeToMinutes(timeText);

                if (time > 0) {
                    totalMinutes += time;

                    if (checkbox && checkbox.checked) {
                        watchedMinutes += time;
                    }
                }
            }
        }

        remainingMinutes = totalMinutes - watchedMinutes;
        if (remainingMinutes !== lastRemainingMinutes) {
            updateUdemyTimeDisplay(activePanel, remainingMinutes);
            lastRemainingMinutes = remainingMinutes;
        }
    }
}

setTimeout(() => {
    if (window.location.href.includes("udemy.com/course/")) {
        extractCourseTime();

        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                if (url.includes("udemy.com/course/")) {
                    extractCourseTime();
                }
            }
        }).observe(document, { subtree: true, childList: true });
    }
}, 10000);