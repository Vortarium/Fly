// Timer data for each fly
const flyData = {
    timmy1: {
        hours: 12,
        status: 'dead'
    },
    timmy2: {
        hours: 5.08,
        status: 'escaped'
    },
    timmy3: {
        start: new Date(),
        startTime: "18:35",
        elementId: "timer3",
        status: 'active'
    },
    timmy4: {
        start: new Date(),
        startTime: "18:41",
        elementId: "timer4",
        status: 'active'
    }
};

// Set the actual start dates
flyData.timmy3.start.setHours(18);
flyData.timmy3.start.setMinutes(35);
flyData.timmy4.start.setHours(18);
flyData.timmy4.start.setMinutes(41);

// Timer function
function timer(start, id) {
    let diff = Math.floor((Date.now() - start) / 1000);
    let h = Math.floor(diff / 3600);
    let m = Math.floor((diff % 3600) / 60);
    let s = diff % 60;
    
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = h + "h " + m + "m " + s + "s";
    }
    return h + (m / 60) + (s / 3600);
}

// Get current hours for active flies
function getFlyHours(flyKey) {
    if (flyData[flyKey].status === 'active') {
        return timer(flyData[flyKey].start, flyData[flyKey].elementId);
    }
    return flyData[flyKey].hours;
}

// Update average lifespan
function updateAverageLifespan() {
    const timmy1Hours = flyData.timmy1.hours;
    const timmy2Hours = flyData.timmy2.hours;
    const timmy3Hours = getFlyHours('timmy3');
    const timmy4Hours = getFlyHours('timmy4');
    
    const avg = (timmy1Hours + timmy2Hours + timmy3Hours + timmy4Hours) / 4;
    const avgElement = document.getElementById('avg-lifespan');
    if (avgElement) {
        avgElement.textContent = avg.toFixed(1) + 'h';
    }
    
    return [timmy1Hours, timmy2Hours, timmy3Hours, timmy4Hours];
}

// Update current date and time
function updateDateTime() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const dayElement = document.getElementById('current-day');
    const timeElement = document.getElementById('current-time');
    
    if (dayElement) {
        dayElement.textContent = `${dayName}, ${monthName} ${day}, ${year}`;
    }
    
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}

// Initialize charts and timers when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initial timer update
    timer(flyData.timmy3.start, "timer3");
    timer(flyData.timmy4.start, "timer4");
    updateAverageLifespan();
    updateDateTime();
    
    // Update timers every second
    setInterval(() => {
        timer(flyData.timmy3.start, "timer3");
        timer(flyData.timmy4.start, "timer4");
        updateAverageLifespan();
    }, 1000);
    
    // Update date/time every second
    setInterval(updateDateTime, 1000);
    
    // Lifespan chart
    const lifespanCtx = document.getElementById('lifespan-chart');
    let lifespanChart;
    if (lifespanCtx) {
        lifespanChart = new Chart(lifespanCtx, {
            type: 'line',
            data: {
                labels: ['Timmy', 'Timmy II', 'Timmy III', 'Timmy IV'],
                datasets: [{
                    label: 'Hours Alive',
                    data: [12, 5.08, 0, 0],
                    fill: false,
                    borderColor: '#00ff00',
                    backgroundColor: '#00ff00',
                    tension: 0.25,
                    pointBackgroundColor: '#00ff00',
                    pointBorderColor: '#00ff00',
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#333'
                        },
                        ticks: {
                            color: '#ffffff'
                        }
                    },
                    x: {
                        grid: {
                            color: '#333'
                        },
                        ticks: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
    
    // Update lifespan chart live
    setInterval(() => {
        if (lifespanChart) {
            const hours = updateAverageLifespan();
            lifespanChart.data.datasets[0].data = hours;
            lifespanChart.update('none');
        }
    }, 1000);
    
    
    // Personality traits chart
    const personalityCtx = document.getElementById('personality-chart');
    if (personalityCtx) {
        new Chart(personalityCtx, {
            type: 'radar',
            data: {
                labels: ['Social', 'Exploration', 'Grooming', 'Activity', 'Feeding'],
                datasets: [{
                    label: 'Timmy',
                    data: [0, 1, 9, 1, 8],
                    backgroundColor: 'rgba(255, 68, 68, 0.2)',
                    borderColor: '#ff4444',
                    pointBackgroundColor: '#ff4444'
                }, {
                    label: 'Timmy II',
                    data: [0, 4, 2, 2, 10],
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    borderColor: 'gold',
                    pointBackgroundColor: 'gold'
                }, {
                    label: 'Timmy III',
                    data: [8, 8, 7, 9, 4],
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: '#00ff00',
                    pointBackgroundColor: '#00ff00'
                }, {
                    label: 'Timmy IV',
                    data: [5, 9, 6, 8, 3],
                    backgroundColor: 'rgba(0, 200, 255, 0.2)',
                    borderColor: '#00c8ff',
                    pointBackgroundColor: '#00c8ff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff',
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        grid: {
                            color: '#333'
                        },
                        pointLabels: {
                            color: '#ffffff',
                            font: {
                                size: 11
                            }
                        },
                        ticks: {
                            color: '#ffffff',
                            backdropColor: '#0d0d0d',
                            font: {
                                size: 9
                            }
                        }
                    }
                }
            }
        });
    }
});
