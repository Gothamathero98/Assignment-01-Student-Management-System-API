/**
 * Student Management System - CRUD Interface
 * Frontend JavaScript for all CRUD operations
 */

const API_BASE_URL = 'http://localhost:3000/api/v1/students';
let currentPage = 1;
let currentLimit = 10;
let currentSearch = '';
let editingStudentId = null;
let pendingDeleteId = null;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initializeEventListeners();
    loadStudents();
});

function initializeEventListeners() {
    // Form submission
    document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);
    
    // Search and filters
    document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 500));
    document.getElementById('limitSelect').addEventListener('change', handleLimitChange);
    
    // Pagination
    document.getElementById('prevBtn').addEventListener('click', previousPage);
    document.getElementById('nextBtn').addEventListener('click', nextPage);
    
    // Cancel edit
    document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);
    
    // Modal close on outside click
    window.addEventListener('click', function (e) {
        const detailsModal = document.getElementById('detailsModal');
        const confirmModal = document.getElementById('confirmModal');
        
        if (e.target === detailsModal) {
            closeDetailsModal();
        }
        if (e.target === confirmModal) {
            closeConfirmModal();
        }
    });
}

// ============================================
// DEBOUNCE UTILITY
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// FORM HANDLING
// ============================================
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Clear previous error messages
    clearErrorMessages();
    
    // Get form data
    const formData = new FormData(document.getElementById('studentForm'));
    const studentData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateFormData(studentData)) {
        return;
    }
    
    try {
        showLoading(true);
        
        if (editingStudentId) {
            // Update existing student
            await updateStudent(editingStudentId, studentData);
            showSuccessMessage('✓ Student updated successfully!');
            cancelEdit();
        } else {
            // Create new student
            await createStudent(studentData);
            showSuccessMessage('✓ Student added successfully!');
        }
        
        // Reset form
        document.getElementById('studentForm').reset();
        
        // Reload students
        currentPage = 1;
        await loadStudents();
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage(error.message || 'An error occurred. Please try again.');
    } finally {
        showLoading(false);
    }
}

// ============================================
// API CALLS - CREATE
// ============================================
async function createStudent(studentData) {
    const response = await fetch(`${API_BASE_URL}/student-create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create student');
    }
    
    return await response.json();
}

// ============================================
// API CALLS - READ
// ============================================
async function loadStudents() {
    try {
        showLoading(true);
        
        const params = new URLSearchParams({
            page: currentPage,
            limit: currentLimit,
            search: currentSearch
        });
        
        const response = await fetch(`${API_BASE_URL}/all-students?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }
        
        const data = await response.json();
        
        if (data.success) {
            displayStudents(data.data);
            updatePaginationInfo(data.pagination);
            hideErrorMessage();
        } else {
            showErrorMessage(data.message || 'Failed to load students');
        }
    } catch (error) {
        console.error('Load students error:', error);
        showErrorMessage(error.message || 'Failed to load students');
    } finally {
        showLoading(false);
    }
}

async function getStudentById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/student-get-one-student/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch student details');
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Get student error:', error);
        throw error;
    }
}

// ============================================
// API CALLS - UPDATE
// ============================================
async function updateStudent(id, studentData) {
    const response = await fetch(`${API_BASE_URL}/student-update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update student');
    }
    
    return await response.json();
}

// ============================================
// API CALLS - DELETE
// ============================================
async function deleteStudent(id) {
    const response = await fetch(`${API_BASE_URL}/student-delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete student');
    }
    
    return await response.json();
}

// ============================================
// UI UPDATES
// ============================================
function displayStudents(students) {
    const tableBody = document.getElementById('studentsTableBody');
    
    if (!students || students.length === 0) {
        tableBody.innerHTML = `
            <tr class="empty-row">
                <td colspan="8">No students found. Try adjusting your search or add a new student.</td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = students.map(student => `
        <tr>
            <td class="student-id">${student._id.substring(0, 8)}...</td>
            <td><strong>${escapeHtml(student.name)}</strong></td>
            <td>${escapeHtml(student.email)}</td>
            <td>${escapeHtml(student.phone)}</td>
            <td>${student.age}</td>
            <td><span class="badge">${escapeHtml(student.course)}</span></td>
            <td>${escapeHtml(student.gender)}</td>
            <td>
                <div class="student-actions">
                    <button class="action-btn view-btn" onclick="viewStudentDetails('${student._id}')">View</button>
                    <button class="action-btn edit-btn" onclick="editStudent('${student._id}')">Edit</button>
                    <button class="action-btn delete-btn" onclick="confirmDelete('${student._id}', '${escapeHtml(student.name)}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function viewStudentDetails(id) {
    try {
        const student = await getStudentById(id);
        const modal = document.getElementById('detailsModal');
        const modalBody = document.getElementById('modalBody');
        
        const createdDate = new Date(student.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        modalBody.innerHTML = `
            <div class="detail-row">
                <div class="detail-item">
                    <div class="detail-label">Full Name</div>
                    <div class="detail-value">${escapeHtml(student.name)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Age</div>
                    <div class="detail-value">${student.age}</div>
                </div>
            </div>
            
            <div class="detail-row">
                <div class="detail-item">
                    <div class="detail-label">Email</div>
                    <div class="detail-value">${escapeHtml(student.email)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Phone</div>
                    <div class="detail-value">${escapeHtml(student.phone)}</div>
                </div>
            </div>
            
            <div class="detail-row">
                <div class="detail-item">
                    <div class="detail-label">Gender</div>
                    <div class="detail-value">${escapeHtml(student.gender)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Course</div>
                    <div class="detail-value">${escapeHtml(student.course)}</div>
                </div>
            </div>
            
            <div class="detail-row">
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <div class="detail-label">Address</div>
                    <div class="detail-value">${escapeHtml(student.address)}</div>
                </div>
            </div>
            
            <div class="detail-row">
                <div class="detail-item">
                    <div class="detail-label">Student ID</div>
                    <div class="detail-value" style="font-family: monospace; font-size: 0.9em;">${student._id}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Created Date</div>
                    <div class="detail-value">${createdDate}</div>
                </div>
            </div>
        `;
        
        modal.classList.add('show');
    } catch (error) {
        showErrorMessage('Failed to load student details');
    }
}

function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    modal.classList.remove('show');
}

async function editStudent(id) {
    try {
        const student = await getStudentById(id);
        
        // Populate form
        document.getElementById('name').value = student.name;
        document.getElementById('age').value = student.age;
        document.getElementById('email').value = student.email;
        document.getElementById('phone').value = student.phone;
        document.getElementById('address').value = student.address;
        document.getElementById('gender').value = student.gender;
        document.getElementById('course').value = student.course;
        
        // Update UI
        editingStudentId = id;
        document.getElementById('formTitle').textContent = '✏️ Edit Student';
        document.getElementById('cancelEditBtn').style.display = 'inline-flex';
        document.querySelector('.btn-primary').textContent = 'Update Student';
        
        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showErrorMessage('Failed to load student for editing');
    }
}

function cancelEdit() {
    editingStudentId = null;
    document.getElementById('studentForm').reset();
    document.getElementById('formTitle').textContent = 'Add New Student';
    document.getElementById('cancelEditBtn').style.display = 'none';
    document.querySelector('.btn-primary').textContent = 'Add Student';
    clearErrorMessages();
}

function confirmDelete(id, name) {
    pendingDeleteId = id;
    const modal = document.getElementById('confirmModal');
    const message = document.getElementById('confirmMessage');
    message.textContent = `Are you sure you want to delete "${name}"? This action cannot be undone.`;
    
    document.getElementById('confirmDeleteBtn').onclick = async function () {
        await performDelete(id);
    };
    
    modal.classList.add('show');
}

function closeConfirmModal() {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('show');
    pendingDeleteId = null;
}

async function performDelete(id) {
    try {
        showLoading(true);
        await deleteStudent(id);
        closeConfirmModal();
        showSuccessMessage('✓ Student deleted successfully!');
        await loadStudents();
    } catch (error) {
        showErrorMessage(error.message || 'Failed to delete student');
    } finally {
        showLoading(false);
    }
}

// ============================================
// SEARCH AND FILTER
// ============================================
function handleSearch(e) {
    currentSearch = e.target.value.trim();
    currentPage = 1;
    loadStudents();
}

function handleLimitChange(e) {
    currentLimit = parseInt(e.target.value);
    currentPage = 1;
    loadStudents();
}

// ============================================
// PAGINATION
// ============================================
function updatePaginationInfo(pagination) {
    const start = (pagination.page - 1) * pagination.limit + 1;
    const end = Math.min(pagination.page * pagination.limit, pagination.total);
    
    document.getElementById('paginationText').textContent = 
        `Showing ${start}-${end} of ${pagination.total} students`;
    document.getElementById('pageIndicator').textContent = 
        `Page ${pagination.page} of ${pagination.pages}`;
    
    // Update button states
    document.getElementById('prevBtn').disabled = pagination.page === 1;
    document.getElementById('nextBtn').disabled = pagination.page >= pagination.pages;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadStudents();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function nextPage() {
    currentPage++;
    loadStudents();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// VALIDATION
// ============================================
function validateFormData(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 3) {
        showFieldError('name', 'Name must be at least 3 characters');
        isValid = false;
    }
    
    // Age validation
    if (!data.age || isNaN(data.age) || data.age < 18 || data.age > 70) {
        showFieldError('age', 'Age must be between 18 and 70');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Address validation
    if (!data.address || data.address.trim().length < 5) {
        showFieldError('address', 'Address must be at least 5 characters');
        isValid = false;
    }
    
    // Gender validation
    if (!data.gender) {
        showFieldError('gender', 'Please select a gender');
        isValid = false;
    }
    
    // Course validation
    if (!data.course) {
        showFieldError('course', 'Please select a course');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
}

// ============================================
// ALERTS AND MESSAGES
// ============================================
function showErrorMessage(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = `❌ ${message}`;
    errorDiv.style.display = 'block';
    setTimeout(() => hideErrorMessage(), 5000);
}

function hideErrorMessage() {
    document.getElementById('errorMessage').style.display = 'none';
}

function showSuccessMessage(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 4000);
}

function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    show ? spinner.style.display = 'flex' : spinner.style.display = 'none';
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
