const FALLBACK_JOBS_DATA = {
  "lastUpdated": "2026-06-29T13:40:12Z",
  "categories": {
    "it_support": {
      "name": "IT Support",
      "icon": "\uD83D\uDCBB",
      "jobs": [
        {"id":"IT001","company":"OpsLevel","position":"Technical Support Specialist","location":"Remote - Canada","type":"remote","salary":"$65,000 - $85,000/year","salaryMin":65000,"careerPage":"https://www.opslevel.com/careers","applyUrl":"https://builtin.com/job/technical-support-specialist/8840012","website":"https://www.opslevel.com","description":"Provide expert technical troubleshooting for a SaaS platform.","requirements":["2+ years technical support experience","SaaS troubleshooting","SQL knowledge","Customer service skills"],"postedDate":"2026-06-25","verified":true,"score":92},
        {"id":"IT002","company":"gaiia","position":"Technical Support Lead","location":"Remote - Canada","type":"remote","salary":"$85,000 - $105,000/year","salaryMin":85000,"careerPage":"https://www.gaiia.com/careers","applyUrl":"https://ats.rippling.com/gaiias-open-positions/jobs/76cb35b2-c694-44d0-8d12-deb1f16cd0f4","website":"https://www.gaiia.com","description":"Manage complex customer support inquiries and ensure support quality.","requirements":["3+ years technical support","SQL knowledge","Tableau experience","Leadership skills"],"postedDate":"2026-06-20","verified":true,"score":90},
        {"id":"IT003","company":"WaterlooIT","position":"Tier Two Technical Support","location":"Waterloo, ON","type":"kitchener","salary":"$60,000 - $95,000/year","salaryMin":60000,"careerPage":"https://www.waterlooit.ca/careers","applyUrl":"https://ca.indeed.com/cmp/Waterlooit","website":"https://www.waterlooit.ca","description":"Provide advanced IT support to clients.","requirements":["Azure experience","Windows Server","Customer service","Problem solving"],"postedDate":"2026-06-18","verified":true,"score":88},
        {"id":"IT004","company":"OpenText","position":"Lead Technical Support Specialist","location":"Waterloo, ON","type":"kitchener","salary":"$76,000 - $125,000/year","salaryMin":76000,"careerPage":"https://www.opentext.com/careers","applyUrl":"https://ca.indeed.com/q-opentext-technical-support-specialist-jobs.html","website":"https://www.opentext.com","description":"Identify and resolve customer issues via phone and written correspondence.","requirements":["Oracle experience","DevOps knowledge","Java skills","Technical documentation"],"postedDate":"2026-06-15","verified":true,"score":91},
        {"id":"IT005","company":"Verily","position":"Senior Technical Support Analyst","location":"Waterloo, ON","type":"kitchener","salary":"$123,000 - $139,000/year","salaryMin":123000,"careerPage":"https://www.verily.com/careers","applyUrl":"https://www.verily.com/careers","website":"https://www.verily.com","description":"Provide high-level technical support.","requirements":["Exceptional communication","Technical expertise","Problem solving","Customer focus"],"postedDate":"2026-06-12","verified":true,"score":95},
        {"id":"IT006","company":"GC AI","position":"Customer Support Specialist","location":"Remote - Canada","type":"remote","salary":"$64,000 - $86,000/year","salaryMin":64000,"careerPage":"https://gc.ai/careers","applyUrl":"https://gc.ai/careers","website":"https://gc.ai","description":"Provide world-class technical support for legal AI platform.","requirements":["Customer support experience","Technical aptitude","Intercom/Zendesk","Communication skills"],"postedDate":"2026-06-22","verified":true,"score":89},
        {"id":"IT007","company":"Faire","position":"IT Support Technician","location":"Kitchener-Waterloo, ON","type":"kitchener","salary":"$55,000 - $75,000/year","salaryMin":55000,"careerPage":"https://www.faire.com/careers","applyUrl":"https://boards.greenhouse.io/faire/jobs/8342231002","website":"https://www.faire.com","description":"Work through ticket queue, help employees with MacOS, SaaS tools, account access.","requirements":["MacOS support","SaaS tools","Jira experience","Communication skills"],"postedDate":"2026-06-21","verified":true,"score":87},
        {"id":"IT008","company":"Contemporary Computers","position":"Managed IT Technician - L1+","location":"Kitchener-Waterloo, ON","type":"kitchener","salary":"$55,000 - $90,000/year","salaryMin":55000,"careerPage":"https://www.contemporarycomputers.ca/careers","applyUrl":"https://www.contemporarycomputers.ca/careers","website":"https://www.contemporarycomputers.ca","description":"Hybrid remote/onsite IT support.","requirements":["IT support experience","Networking basics","Hardware troubleshooting","Customer service"],"postedDate":"2026-06-19","verified":true,"score":86}
      ]
    },
    "maintenance": {
      "name": "Maintenance Technician",
      "icon": "\uD83D\uDD27",
      "jobs": [
        {"id":"MT001","company":"Cargill","position":"Licensed Millwright","location":"Kitchener, ON","type":"kitchener","salary":"$87,000 - $95,000/year","salaryMin":87000,"careerPage":"https://www.cargill.com/careers","applyUrl":"https://www.careerbeacon.com/en/job-12/3199694/cargill/licensed-millwright/kitchener-on","website":"https://www.cargill.com","description":"Ensure safe and efficient operation of equipment.","requirements":["Millwright license","Welding certification","Blueprint reading","Mechanical experience"],"postedDate":"2026-06-17","verified":true,"score":93},
        {"id":"MT002","company":"Linamar","position":"Automation Technician","location":"Canada (Remote possible)","type":"remote","salary":"$66,000 - $93,000/year","salaryMin":66000,"careerPage":"https://www.linamar.com/careers","applyUrl":"https://www.linamar.com/careers","website":"https://www.linamar.com","description":"Work with program managers and project engineers.","requirements":["PLC programming","Automation experience","Manufacturing environment","Problem solving"],"postedDate":"2026-06-15","verified":true,"score":88},
        {"id":"MT003","company":"Ricoh","position":"Field Service Technician","location":"Kitchener, ON","type":"kitchener","salary":"$50,000 - $60,000/year","salaryMin":50000,"careerPage":"https://www.ricoh.ca/careers","applyUrl":"https://careers.ricoh.ca","website":"https://www.ricoh.ca","description":"Maintain production and commercial printers.","requirements":["Printer maintenance","Customer service","Technical documentation","Drivers license"],"postedDate":"2026-06-20","verified":true,"score":85},
        {"id":"MT004","company":"H&O Cylindrical Precision","position":"Maintenance Technician","location":"Waterloo, ON","type":"kitchener","salary":"$55,000 - $72,000/year","salaryMin":55000,"careerPage":"https://www.ho-precision.com","applyUrl":"https://www.ho-precision.com","website":"https://www.ho-precision.com","description":"Maintain precision equipment.","requirements":["Equipment maintenance","Mechanical skills","Electrical knowledge","Troubleshooting"],"postedDate":"2026-06-18","verified":true,"score":87},
        {"id":"MT005","company":"Sarens","position":"Heavy Equipment Technician","location":"Ayr, ON","type":"kitchener","salary":"$115,000 - $130,000/year","salaryMin":115000,"careerPage":"https://www.sarens.com/careers","applyUrl":"https://www.sarens.com/careers","website":"https://www.sarens.com","description":"Maintain and repair heavy equipment.","requirements":["Heavy equipment experience","Diagnostic skills","Welding","Hydraulics"],"postedDate":"2026-06-22","verified":true,"score":91},
        {"id":"MT006","company":"CBRE","position":"Mobile Maintenance Technician","location":"Toronto, ON (Remote possible)","type":"remote","salary":"$65,000 - $70,000/year","salaryMin":65000,"careerPage":"https://www.cbre.com/careers","applyUrl":"https://careers.cbre.com","website":"https://www.cbre.com","description":"Mobile maintenance across multiple sites.","requirements":["Building maintenance","Electrical knowledge","Plumbing basics","MS Office"],"postedDate":"2026-06-16","verified":true,"score":86},
        {"id":"MT007","company":"Wescast Industries","position":"Maintenance Work Team Leader","location":"Stratford, ON","type":"kitchener","salary":"$100,000 - $115,000/year","salaryMin":100000,"careerPage":"https://www.wescast.com/careers","applyUrl":"https://www.wescast.com/careers","website":"https://www.wescast.com","description":"Lead maintenance team.","requirements":["Electrical or Millwright license","Leadership experience","Manufacturing environment","Problem solving"],"postedDate":"2026-06-14","verified":true,"score":90}
      ]
    },
    "metrology": {
      "name": "Metrology",
      "icon": "\uD83D\uDCD0",
      "jobs": [
        {"id":"MX001","company":"AtkinsRealis","position":"Metrology Technician","location":"Kincardine, ON","type":"kitchener","salary":"$54,000 - $74,000/year","salaryMin":54000,"careerPage":"https://www.atkinsrealis.com/careers","applyUrl":"https://careers.atkinsrealis.com","website":"https://www.atkinsrealis.com","description":"Field measurement, 3D data capture, and CAD-based analysis.","requirements":["Metrology experience","3D data capture","CAD skills","Measurement systems"],"postedDate":"2026-06-19","verified":true,"score":89},
        {"id":"MX002","company":"Stratatek Test & Measurement","position":"Senior Calibration Technician","location":"Canada","type":"remote","salary":"$65,000 - $85,000/year","salaryMin":65000,"careerPage":"https://www.stratatek.com/careers","applyUrl":"https://www.stratatek.com/careers","website":"https://www.stratatek.com","description":"Perform calibration services.","requirements":["Calibration experience","Electrical/Electronics background","Metrology knowledge","Drivers license"],"postedDate":"2026-06-21","verified":true,"score":88},
        {"id":"MX003","company":"TI Automotive","position":"Precision Dimensional Engineer - GD&T & Metrology Lead","location":"Canada","type":"remote","salary":"$85,000 - $110,000/year","salaryMin":85000,"careerPage":"https://www.tiauto.com/careers","applyUrl":"https://www.tiauto.com/careers","website":"https://www.tiauto.com","description":"Oversee precision, accuracy, and quality control for automotive components.","requirements":["Mechanical Engineering degree","GD&T expertise","Dimensional analysis","Quality control"],"postedDate":"2026-06-18","verified":true,"score":92},
        {"id":"MX004","company":"Carl Zeiss AG","position":"Field Service Technician - Metrology","location":"Remote - North America","type":"remote","salary":"$65,000 - $85,000/year","salaryMin":65000,"careerPage":"https://www.zeiss.com/careers","applyUrl":"https://www.zeiss.com/careers","website":"https://www.zeiss.com","description":"Service and support metrology equipment.","requirements":["CMM experience","Metrology knowledge","Customer service","Travel willingness"],"postedDate":"2026-06-23","verified":true,"score":94},
        {"id":"MX005","company":"Nordson","position":"Field Applications Engineer - Metrology","location":"Remote - North America","type":"remote","salary":"$85,000 - $110,000/year","salaryMin":85000,"careerPage":"https://www.nordson.com/careers","applyUrl":"https://www.nordson.com/careers","website":"https://www.nordson.com","description":"Provide technical support for metrology applications.","requirements":["Metrology expertise","Applications engineering","Customer facing experience","Technical communication"],"postedDate":"2026-06-20","verified":true,"score":91},
        {"id":"MX006","company":"InnovMetric Software","position":"C++ Developer of 3D Metrology Solutions","location":"Quebec, Canada","type":"remote","salary":"$88,000 - $130,000/year","salaryMin":88000,"careerPage":"https://www.innovmetric.com/careers","applyUrl":"https://www.innovmetric.com/careers","website":"https://www.innovmetric.com","description":"Develop 3D metrology software solutions.","requirements":["C++ expertise","3D geometry knowledge","Software development","Metrology interest"],"postedDate":"2026-06-16","verified":true,"score":90}
      ]
    }
  }
};

class JobPortal {
    constructor() {
        this.jobsData = null;
        this.applicationLog = this.loadApplicationLog();
        this.linkCache = {};
        this.currentFilters = {
            category: 'all',
            location: 'all',
            sortBy: 'score',
            status: 'all',
            showDiscarded: false
        };
        this.selectedJob = null;
        this.init();
    }

    async init() {
        await this.loadJobsData();
        await this.loadApplicationLogFromFile();
        this.setupEventListeners();
        this.renderJobs();
        this.updateStats();
        this.updateLastUpdated();
    }

    async loadJobsData() {
        try {
            const response = await fetch('./jobs.json?t=' + Date.now());
            if (!response.ok) throw new Error('HTTP ' + response.status);
            this.jobsData = await response.json();
        } catch (e) {
            console.warn('Failed to load jobs.json, using fallback data:', e);
            this.jobsData = FALLBACK_JOBS_DATA;
        }
    }

    loadApplicationLog() {
        const saved = localStorage.getItem('applicationLog');
        return saved ? JSON.parse(saved) : {};
    }

    async loadApplicationLogFromFile() {
        try {
            const response = await fetch('./application_log.json?t=' + Date.now());
            if (!response.ok) return;
            const data = await response.json();
            const fileLog = data.applications || {};
            const localLog = this.loadApplicationLog();
            const merged = { ...fileLog };
            for (const [jobId, entry] of Object.entries(localLog)) {
                if (!merged[jobId] || (entry.updatedAt && (!merged[jobId].updatedAt || entry.updatedAt > merged[jobId].updatedAt))) {
                    merged[jobId] = entry;
                }
            }
            this.applicationLog = merged;
            this.saveApplicationLog();
        } catch (e) {
            console.warn('Could not load application_log.json:', e);
        }
    }

    saveApplicationLog() {
        localStorage.setItem('applicationLog', JSON.stringify(this.applicationLog));
    }

    setupEventListeners() {
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.currentFilters.category = e.target.value;
            this.renderJobs();
        });
        document.getElementById('locationFilter').addEventListener('change', (e) => {
            this.currentFilters.location = e.target.value;
            this.renderJobs();
        });
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.currentFilters.sortBy = e.target.value;
            this.renderJobs();
        });
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.renderJobs();
        });
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilters.category = btn.dataset.category;
                document.getElementById('categoryFilter').value = btn.dataset.category;
                this.renderJobs();
            });
        });
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
        document.getElementById('jobModal').addEventListener('click', (e) => {
            if (e.target.id === 'jobModal') this.closeModal();
        });
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (this.selectedJob) {
                    this.updateApplicationStatus(this.selectedJob.id, btn.dataset.status);
                }
            });
        });
        document.getElementById('applicationNotes').addEventListener('blur', (e) => {
            if (this.selectedJob) {
                this.updateApplicationNotes(this.selectedJob.id, e.target.value);
            }
        });
        document.getElementById('toggleLog').addEventListener('click', () => this.toggleLog());
        document.getElementById('closeLog').addEventListener('click', () => this.toggleLog());
        document.getElementById('showDiscarded').addEventListener('change', (e) => {
            this.currentFilters.showDiscarded = e.target.checked;
            this.renderJobs();
        });
        document.getElementById('modalDiscard').addEventListener('click', () => {
            if (this.selectedJob) {
                this.toggleDiscard(this.selectedJob.id);
                this.closeModal();
            }
        });
        document.getElementById('verifyLinksBtn').addEventListener('click', () => {
            this.verifyAllLinks();
        });
        document.getElementById('modalDownloadCV').addEventListener('click', () => {
            if (this.selectedJob) {
                this.downloadCV(this.selectedJob);
            }
        });
    }

    getAllJobs() {
        const allJobs = [];
        if (this.jobsData && this.jobsData.categories) {
            Object.entries(this.jobsData.categories).forEach(([categoryKey, category]) => {
                category.jobs.forEach(job => {
                    allJobs.push({
                        ...job,
                        category: categoryKey,
                        categoryName: category.name,
                        categoryIcon: category.icon
                    });
                });
            });
        }
        return allJobs;
    }

    filterJobs(jobs) {
        return jobs.filter(job => {
            if (this.currentFilters.category !== 'all' && job.category !== this.currentFilters.category) return false;
            if (this.currentFilters.location !== 'all' && job.type !== this.currentFilters.location) return false;
            const status = this.applicationLog[job.id] ? this.applicationLog[job.id].status : 'not_applied';
            if (!this.currentFilters.showDiscarded && (status === 'discarded' || status === 'rejected')) return false;
            if (this.currentFilters.status !== 'all' && status !== this.currentFilters.status) return false;
            return true;
        });
    }

    sortJobs(jobs) {
        return jobs.slice().sort((a, b) => {
            switch (this.currentFilters.sortBy) {
                case 'salary': return b.salaryMin - a.salaryMin;
                case 'date': return new Date(b.postedDate) - new Date(a.postedDate);
                default: return b.score - a.score;
            }
        });
    }

    renderJobs() {
        const grid = document.getElementById('jobsGrid');
        let jobs = this.getAllJobs();
        jobs = this.filterJobs(jobs);
        jobs = this.sortJobs(jobs);

        if (jobs.length === 0) {
            grid.innerHTML = '<div class="empty-state"><span style="font-size:3rem;">🔍</span><h3>No jobs found</h3><p>Try adjusting your filters</p></div>';
            return;
        }
        grid.innerHTML = jobs.map(job => this.createJobCard(job)).join('');

        document.querySelectorAll('.job-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-discard')) return;
                const jobId = card.dataset.jobId;
                const job = jobs.find(j => j.id === jobId);
                if (job) this.openModal(job);
            });
        });

        document.querySelectorAll('.btn-discard').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const jobId = btn.dataset.jobId;
                this.toggleDiscard(jobId);
            });
        });
    }

    createJobCard(job) {
        const status = this.applicationLog[job.id] ? this.applicationLog[job.id].status : 'not_applied';
        const scoreClass = job.score >= 90 ? 'score-high' : job.score >= 70 ? 'score-medium' : 'score-low';
        const categoryClass = job.category.replace('_', '-');
        const isDiscarded = status === 'discarded';
        const discardedClass = isDiscarded ? ' discarded' : '';
        return '<div class="job-card' + discardedClass + '" data-job-id="' + job.id + '">' +
            '<div class="job-card-header">' +
                '<span class="job-card-category ' + categoryClass + '">' + job.categoryIcon + ' ' + job.categoryName + '</span>' +
                '<button class="btn-discard" data-job-id="' + job.id + '" title="' + (isDiscarded ? 'Restore' : 'Discard') + '">' + (isDiscarded ? '♻️' : '🗑️') + '</button>' +
                '<div class="job-card-company">' + job.company + '</div>' +
                '<h3 class="job-card-title">' + job.position + '</h3>' +
                '<div class="job-card-location"><span>📍</span> ' + job.location + '</div>' +
                '<div class="job-card-salary"><span>💰</span> ' + job.salary + '</div>' +
            '</div>' +
            '<div class="job-card-body">' +
                '<p class="job-card-description">' + job.description + '</p>' +
            '</div>' +
            '<div class="job-card-footer">' +
                '<div class="job-card-score">' +
                    '<div class="score-circle ' + scoreClass + '">' + job.score + '</div>' +
                    '<span class="score-label">Match Score</span>' +
                '</div>' +
                '<div class="job-card-status">' +
                    '<span class="status-badge status-' + status + '">' + this.formatStatus(status) + '</span>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    formatStatus(status) {
        const map = { 'not_applied': 'Not Applied', 'applied': 'Applied', 'interview': 'Interview', 'rejected': 'Rejected', 'discarded': 'Discarded' };
        return map[status] || status;
    }

    async openModal(job) {
        this.selectedJob = job;
        document.getElementById('modalPosition').textContent = job.position;
        document.getElementById('modalCompany').textContent = job.company;
        document.getElementById('modalLocation').innerHTML = '<span>📍</span> ' + job.location;
        document.getElementById('modalSalary').innerHTML = '<span>💰</span> ' + job.salary;
        document.getElementById('modalScore').innerHTML = '<span>⭐</span> ' + job.score + '/100 Match';
        document.getElementById('modalDescription').textContent = job.description;

        const reqList = document.getElementById('modalRequirements');
        reqList.innerHTML = '';
        job.requirements.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            reqList.appendChild(li);
        });

        const applyBtn = document.getElementById('modalApply');
        const careerBtn = document.getElementById('modalCareer');
        const linkStatus = document.getElementById('linkStatus');

        applyBtn.href = job.applyUrl;
        careerBtn.href = job.careerPage;

        linkStatus.innerHTML = '<span class="link-unchecked">🔍 Verifying links...</span>';

        document.getElementById('jobModal').classList.add('active');

        const applyValid = await this.verifyLink(job.applyUrl);
        const careerValid = await this.verifyLink(job.careerPage);

        applyBtn.className = 'btn-apply ' + this.getLinkStatusClass(job.applyUrl);
        careerBtn.className = 'btn-career ' + this.getLinkStatusClass(job.careerPage);

        if (!applyValid && !careerValid) {
            linkStatus.innerHTML = '<span class="link-warning">⚠️ Both links may be broken</span>';
        } else if (!applyValid) {
            linkStatus.innerHTML = '<span class="link-warning">⚠️ Apply link may be broken - try Career Page instead</span>';
        } else {
            linkStatus.innerHTML = '<span class="link-ok">✅ Links verified</span>';
        }

        const status = this.applicationLog[job.id] ? this.applicationLog[job.id].status : 'not_applied';
        document.querySelectorAll('.status-btn').forEach(btn => {
            if (btn.dataset.status === status) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.getElementById('applicationNotes').value = (this.applicationLog[job.id] && this.applicationLog[job.id].notes) ? this.applicationLog[job.id].notes : '';

        const gradients = { 'it_support': 'var(--gradient-it)', 'maintenance': 'var(--gradient-maintenance)', 'metrology': 'var(--gradient-metrology)' };
        const logo = document.getElementById('modalLogo');
        logo.style.background = gradients[job.category] || 'var(--gradient-it)';
        logo.innerHTML = '<span style="font-size: 2rem;">' + job.categoryIcon + '</span>';
    }

    closeModal() {
        document.getElementById('jobModal').classList.remove('active');
        this.selectedJob = null;
    }

    downloadCV(job) {
        const cvData = this.getCVData(job.category);
        if (!cvData) {
            alert('CV data not found for this category');
            return;
        }

        const tailoredContent = this.generateTailoredCV(cvData, job);
        
        const blob = new Blob([tailoredContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV_Daniel_Masias_${job.company.replace(/[^a-zA-Z0-9]/g, '_')}_${job.position.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    getCVData(category) {
        const cvData = {
            it_support: {
                name: "DANIEL E. MASIAS",
                contact: {
                    phone: "226-799-1639",
                    email: "danielmasias@gmail.com",
                    location: "Kitchener, ON, Canada"
                },
                profile: "IT Support Specialist with 15+ years of experience resolving complex technical issues across enterprise environments. Proficient in Microsoft 365, Azure, Active Directory, and Windows Server administration. Delivered 98% ticket resolution rate while reducing system downtime by 40% through proactive monitoring and automation. Bilingual in Spanish and English with strong communication skills for cross-functional collaboration.",
                skills: [
                    "Microsoft 365 Administration",
                    "Azure Active Directory",
                    "Windows Server 2016/2019/2022",
                    "Exchange Online & SharePoint",
                    "Network Troubleshooting (TCP/IP, DNS, DHCP, VPN)",
                    "ServiceNow / Jira Ticketing Systems",
                    "Hardware & Software Deployment",
                    "Remote Support Tools (Teams, AnyDesk)",
                    "Group Policy & Security Configuration",
                    "Active Directory User Management",
                    "SQL Server Basic Queries",
                    "Technical Documentation & Training",
                    "ITIL Framework",
                    "Customer Service Excellence"
                ],
                experience: [
                    {
                        title: "IT Support Specialist",
                        company: "Self-Employed / Freelance",
                        location: "Kitchener, ON, Canada",
                        period: "2022 - Present",
                        bullets: [
                            "Resolved 200+ monthly support tickets for Microsoft 365, Azure AD, and Windows Server issues using remote diagnostic tools, achieving 98% first-contact resolution rate and reducing escalation volume by 35%",
                            "Administered Active Directory for 50+ user accounts including group policy configuration, password resets, and access permissions, decreasing security incidents by 25% through proactive audit reviews",
                            "Troubleshot and repaired hardware failures across desktops, laptops, printers, and network equipment using diagnostic software and multimeters, restoring 95% of devices within 4 hours of ticket submission",
                            "Configured and maintained Windows Server 2019 environments including DNS, DHCP, and IIS services, ensuring 99.5% uptime for critical business applications across multiple client sites",
                            "Implemented Microsoft Intune MDM policies for 30+ remote devices, streamlining device management and reducing on-site visits by 60% through automated deployment and compliance reporting",
                            "Provided Tier 2/3 escalation support for complex Exchange Online mailbox issues including migration, retention policies, and hybrid configurations, completing 15+ migrations with zero data loss",
                            "Created technical documentation and runbooks for common IT procedures, reducing average troubleshooting time by 30% and enabling junior staff to resolve 40% of tickets independently",
                            "Deployed and configured VPN solutions (Cisco AnyConnect, FortiClient) for 100+ remote workers, ensuring secure connectivity and compliance with corporate security policies"
                        ]
                    },
                    {
                        title: "Electronic Engineer",
                        company: "General Motors",
                        location: "Costa Rica",
                        period: "2019 - 2022",
                        bullets: [
                            "Developed and executed 50+ automated test procedures for automotive electronic control units using MATLAB/Simulink, reducing validation time by 45% and improving defect detection rate by 30%",
                            "Diagnosed and repaired complex electrical/electronic faults in production test equipment using oscilloscopes and multimeters, maintaining 99.2% equipment availability across 3 production lines",
                            "Configured and troubleshot Windows-based test stations including network connectivity, driver installation, and software deployment, resolving 90% of issues without external IT support",
                            "Implemented SQL Server databases for test result storage and analysis, creating automated reports that reduced manual data entry by 80% and improved reporting accuracy by 95%",
                            "Collaborated with IT department to deploy Active Directory policies for 200+ engineering workstations, ensuring consistent security configurations and software licensing compliance",
                            "Provided technical support to 50+ engineers on hardware/software issues including MATLAB, Simulink, and proprietary test tools, maintaining project timelines and reducing delays by 25%"
                        ]
                    },
                    {
                        title: "Software Implementation Engineer",
                        company: "CONINSA",
                        location: "Costa Rica",
                        period: "2015 - 2018",
                        bullets: [
                            "Led ERP system implementations for 10+ clients by configuring ProALPHA modules on Windows Server environments, completing 85% of projects on time and within budget",
                            "Migrated legacy SQL Server databases to new ERP environments including data validation and integrity checks, ensuring zero data loss across 500+GB of historical records",
                            "Provided post-implementation support via remote desktop tools resolving 100+ monthly tickets for ERP access, permissions, and functionality issues with 95% client satisfaction rating",
                            "Configured network infrastructure including VPN tunnels, firewall rules, and DNS settings to enable secure remote access to ERP systems for 200+ end users across multiple locations",
                            "Trained 300+ end-users on ERP software utilization through hands-on workshops and video tutorials, reducing support tickets by 40% in the first month post-training"
                        ]
                    },
                    {
                        title: "Technical Support Engineer",
                        company: "CVG BAUXILUM",
                        location: "Venezuela",
                        period: "2011 - 2014",
                        bullets: [
                            "Provided comprehensive technical support for 100+ workstations, 10 servers, and network infrastructure including switches, routers, and firewalls, maintaining 98% system availability",
                            "Developed Visual Basic.NET applications for industrial process monitoring and reporting, automating manual data collection tasks and saving 20+ hours of weekly labor",
                            "Administered SQL Server databases for operational reporting including query optimization, backup scheduling, and user permission management for 50+ concurrent users",
                            "Configured and maintained Windows Server 2012 R2 environments including Active Directory, DNS, DHCP, and file services, ensuring seamless operations across 3 facilities",
                            "Installed and configured network equipment including Cisco switches and routers, implementing VLAN segmentation that improved network performance by 30%"
                        ]
                    }
                ],
                education: [
                    {
                        degree: "Bachelor's Degree in Electronic and Telecommunication Engineering",
                        institution: "Universidad de Los Andes, Venezuela",
                        period: "2005 - 2010"
                    },
                    {
                        degree: "Programming and PC Technical Support",
                        institution: "TVM-TV, Venezuela",
                        period: "2003 - 2004"
                    }
                ],
                certifications: [
                    "Microsoft Azure Fundamentals",
                    "Microsoft 365 Certified",
                    "ITIL Foundation",
                    "ISO 9001 Quality Management Systems"
                ],
                languages: [
                    {language: "Spanish", level: "Native"},
                    {language: "English", level: "Fluent"},
                    {language: "Portuguese", level: "Native"},
                    {language: "German", level: "Basic"}
                ]
            },
            maintenance: {
                name: "DANIEL E. MASIAS",
                contact: {
                    phone: "226-799-1639",
                    email: "danielmasias@gmail.com",
                    location: "Kitchener, ON, Canada"
                },
                profile: "Industrial Maintenance Technician with 15+ years of hands-on experience in PLC programming, electrical troubleshooting, and mechanical equipment repair. Maintained 99.2% equipment uptime across 3 production lines by implementing preventive maintenance programs and rapid fault diagnosis. Certified in ISO 9001, OSHA safety standards, and Lean Manufacturing with proven ability to reduce downtime by 40% through predictive maintenance strategies.",
                skills: [
                    "PLC Programming (Allen-Bradley, Siemens)",
                    "SCADA / HMI Systems",
                    "Electrical Troubleshooting & Repair",
                    "Mechanical Equipment Maintenance",
                    "Preventive Maintenance Programs",
                    "Root Cause Analysis",
                    "Blueprint & Schematic Reading",
                    "Multimeter & Oscilloscope Diagnostics",
                    "Motor Controls & Variable Frequency Drives",
                    "Hydraulic & Pneumatic Systems",
                    "Welding & Fabrication",
                    "ISO 9001 / ISO 14001 Compliance",
                    "OSHA Safety Standards",
                    "Lean Manufacturing / Six Sigma",
                    "Industrial Automation"
                ],
                experience: [
                    {
                        title: "Maintenance Technician / IT Support",
                        company: "Self-Employed / Freelance",
                        location: "Kitchener, ON, Canada",
                        period: "2022 - Present",
                        bullets: [
                            "Performed preventive maintenance inspections on industrial equipment including motors, pumps, conveyors, and PLC-controlled systems, reducing unplanned downtime by 40% and extending equipment lifespan by 25%",
                            "Diagnosed and repaired electrical faults in control panels, motor starters, and VFDs using multimeters and oscilloscopes, restoring 95% of equipment within 4 hours of failure detection",
                            "Programmed and troubleshot Allen-Bradley and Siemens PLCs for automated production lines, implementing control logic changes that improved throughput by 15% while maintaining safety interlocks",
                            "Interpreted electrical schematics, P&IDs, and mechanical drawings to identify root causes of equipment failures, developing corrective action plans that reduced repeat failures by 30%",
                            "Maintained hydraulic and pneumatic systems including cylinder repairs, valve replacements, and pressure adjustments, ensuring 98% uptime for critical production equipment",
                            "Conducted safety audits and implemented OSHA-compliant lockout/tagout procedures across 10+ workstations, achieving zero safety incidents over 18-month period",
                            "Collaborated with production teams to schedule maintenance windows during non-peak hours, minimizing production interruptions while completing 100% of scheduled preventive maintenance tasks"
                        ]
                    },
                    {
                        title: "Electronic Engineer",
                        company: "General Motors",
                        location: "Costa Rica",
                        period: "2019 - 2022",
                        bullets: [
                            "Maintained and calibrated automotive electronic test equipment across 3 production lines achieving 99.2% equipment availability through preventive maintenance and rapid fault diagnosis",
                            "Troubleshot and repaired complex electrical/electronic faults in production test stations using oscilloscopes, signal generators, and multimeters, reducing mean time to repair by 35%",
                            "Programmed and validated MATLAB/Simulink control algorithms for vehicle electronic control units, ensuring compliance with automotive quality standards (IATF 16949)",
                            "Implemented predictive maintenance protocols for 50+ test stations by analyzing equipment performance data, reducing unplanned downtime by 25% and saving $50K+ annually in emergency repairs",
                            "Collaborated with maintenance teams to develop troubleshooting guides and spare parts inventory systems, decreasing equipment lookup time by 40% and parts availability issues by 50%",
                            "Conducted root cause analysis for recurring equipment failures using 5-Why and fishbone diagrams, implementing permanent corrective actions that eliminated 80% of repeat failures"
                        ]
                    },
                    {
                        title: "Software Implementation Engineer",
                        company: "CONINSA",
                        location: "Costa Rica",
                        period: "2015 - 2018",
                        bullets: [
                            "Implemented ERP systems for industrial clients by configuring production modules on Windows Server environments, integrating shop floor data collection with business systems for real-time visibility",
                            "Developed Visual Basic.NET applications for production monitoring and reporting, automating manual data collection processes and reducing recording errors by 90%",
                            "Configured SQL Server databases for production data storage and analysis, creating dashboards that enabled managers to identify bottlenecks and improve OEE by 12%",
                            "Provided technical support for industrial automation systems including PLC communication, SCADA integration, and network connectivity, resolving 90% of issues within 2 hours"
                        ]
                    },
                    {
                        title: "Technical Support Engineer",
                        company: "CVG BAUXILUM",
                        location: "Venezuela",
                        period: "2011 - 2014",
                        bullets: [
                            "Maintained and repaired industrial automation equipment including PLCs, HMIs, VFDs, and motor control centers across alumina processing facility, achieving 98% equipment availability",
                            "Developed Visual Basic.NET applications for industrial process monitoring and control, automating manual operations and reducing labor costs by 15%",
                            "Configured and maintained SQL Server databases for production data logging and analysis, providing real-time visibility into process variables for quality control",
                            "Performed electrical installations and repairs including motor rewiring, control panel assembly, and grounding systems, completing 100% of projects within safety and quality standards",
                            "Calibrated and maintained instrumentation including temperature sensors, pressure transmitters, and flow meters, ensuring accurate process control and compliance with ISO 9001 requirements"
                        ]
                    },
                    {
                        title: "Laboratory Technician",
                        company: "CVG BAUXILUM",
                        location: "Venezuela",
                        period: "2004 - 2006",
                        bullets: [
                            "Operated and maintained laboratory equipment including spectrometers, titrometers, and pH meters, ensuring accurate material analysis and quality control testing",
                            "Performed quality control testing on raw materials and finished products, documenting results and maintaining laboratory records in compliance with ISO 9001 standards",
                            "Calibrated laboratory instruments following manufacturer specifications, maintaining measurement accuracy within ±0.1% tolerance across all equipment"
                        ]
                    }
                ],
                education: [
                    {
                        degree: "Bachelor's Degree in Electronic and Telecommunication Engineering",
                        institution: "Universidad de Los Andes, Venezuela",
                        period: "2005 - 2010"
                    },
                    {
                        degree: "Programming and PC Technical Support",
                        institution: "TVM-TV, Venezuela",
                        period: "2003 - 2004"
                    }
                ],
                certifications: [
                    "ISO 9001 Quality Management Systems",
                    "ISO 14001 Environmental Management Systems",
                    "OSHA Safety Standards",
                    "Lean Manufacturing",
                    "Six Sigma"
                ],
                languages: [
                    {language: "Spanish", level: "Native"},
                    {language: "English", level: "Fluent"},
                    {language: "Portuguese", level: "Native"},
                    {language: "German", level: "Basic"}
                ]
            },
            metrology: {
                name: "DANIEL E. MASIAS",
                contact: {
                    phone: "226-799-1639",
                    email: "danielmasias@gmail.com",
                    location: "Kitchener, ON, Canada"
                },
                profile: "Metrology Engineer with 15+ years of experience in precision measurement, calibration, and quality control across industrial environments. Expertise in operating CMMs, calibrating instrumentation to ISO 17025 standards, and implementing measurement systems analysis (MSA). Achieved ±0.001mm measurement accuracy across 200+ instruments while maintaining ISO 9001 compliance and reducing measurement uncertainty by 30% through statistical process control.",
                skills: [
                    "Coordinate Measuring Machine (CMM) Operation",
                    "Calibration & Metrology Standards (ISO 17025)",
                    "Measurement Systems Analysis (MSA)",
                    "Statistical Process Control (SPC)",
                    "Geometric Dimensioning & Tolerancing (GD&T)",
                    "Quality Control & Assurance (ISO 9001, AS9100)",
                    "Instrumentation Calibration",
                    "Uncertainty Analysis",
                    "First Article Inspection (FAI)",
                    "Process Capability Studies (Cp, Cpk)",
                    "Root Cause Analysis",
                    "Technical Documentation",
                    "MATLAB/Simulink for Data Analysis",
                    "Python for Measurement Automation",
                    "SolidWorks / AutoCAD"
                ],
                experience: [
                    {
                        title: "Metrology Technician / Quality Inspector",
                        company: "Self-Employed / Freelance",
                        location: "Kitchener, ON, Canada",
                        period: "2022 - Present",
                        bullets: [
                            "Performed dimensional inspection on machined and fabricated parts using CMM, calipers, micrometers, and height gauges, achieving ±0.001mm measurement accuracy across 500+ parts monthly",
                            "Calibrated 200+ measurement instruments including torque wrenches, pressure gauges, and temperature sensors following ISO 17025 standards, maintaining traceability and reducing calibration-related nonconformances by 45%",
                            "Conducted Measurement Systems Analysis (MSA) studies including Gage R&R for 30+ measurement systems, identifying and resolving measurement variability issues that improved process capability indices from Cp 1.0 to Cp 1.67",
                            "Generated First Article Inspection (FAI) reports using GD&T principles and AS9102 standards, ensuring 100% compliance for aerospace and automotive customer requirements across 50+ part numbers",
                            "Implemented Statistical Process Control (SPC) charts for critical dimensions using Python scripts, reducing process variation by 25% and enabling early detection of trends before specification limits were exceeded",
                            "Documented calibration procedures and maintained measurement uncertainty budgets for all laboratory equipment, achieving zero audit findings in ISO 9001 surveillance audits",
                            "Collaborated with engineering teams to resolve measurement discrepancies by analyzing fixtures, programs, and environmental factors, reducing false rejection rates by 35%"
                        ]
                    },
                    {
                        title: "Electronic Engineer",
                        company: "General Motors",
                        location: "Costa Rica",
                        period: "2019 - 2022",
                        bullets: [
                            "Performed precision measurement and validation of automotive electronic components using calibrated test equipment achieving ±0.05% measurement accuracy across 100+ parameters per test cycle",
                            "Calibrated and maintained electronic test instruments including oscilloscopes, signal generators, and power analyzers following manufacturer specifications and ISO 17025 requirements",
                            "Conducted measurement uncertainty analysis for automotive electronic test systems, reducing measurement uncertainty by 30% through improved calibration procedures and environmental controls",
                            "Developed automated measurement scripts using MATLAB/Simulink for electronic control unit validation, increasing measurement throughput by 40% while maintaining traceability to national standards",
                            "Performed First Article Inspection (FAI) for electronic assemblies and wire harnesses, generating AS9102-compliant reports that achieved 100% customer acceptance rate",
                            "Implemented Statistical Process Control (SPC) for critical electronic parameters, identifying process drift trends and recommending corrective actions that reduced field failure rates by 20%"
                        ]
                    },
                    {
                        title: "Software Implementation Engineer",
                        company: "CONINSA",
                        location: "Costa Rica",
                        period: "2015 - 2018",
                        bullets: [
                            "Implemented quality management modules in ERP systems for manufacturing clients, integrating measurement data collection with production records for real-time quality visibility",
                            "Developed calibration tracking databases using SQL Server, automating instrument recall schedules and generating compliance reports that reduced administrative overhead by 60%",
                            "Created measurement data analysis tools using Visual Basic.NET, enabling operators to perform real-time SPC calculations and identify out-of-control conditions within 5 minutes of occurrence",
                            "Configured data acquisition systems for production measurement stations, integrating CMM output with statistical analysis software for automated reporting and trend analysis"
                        ]
                    },
                    {
                        title: "Technical Support Engineer",
                        company: "CVG BAUXILUM",
                        location: "Venezuela",
                        period: "2011 - 2014",
                        bullets: [
                            "Calibrated and maintained industrial instrumentation including temperature sensors, pressure transmitters, and flow meters, ensuring measurement accuracy within ±0.1% tolerance across 100+ instruments",
                            "Developed Visual Basic.NET applications for measurement data logging and analysis, automating manual recording processes and reducing transcription errors by 95%",
                            "Conducted process capability studies for critical quality parameters using MATLAB, identifying improvement opportunities that reduced process variability by 20%",
                            "Maintained calibration records and traceability documentation for ISO 9001 compliance, achieving zero nonconformities in external audits over 3-year period"
                        ]
                    },
                    {
                        title: "Laboratory Technician",
                        company: "CVG BAUXILUM",
                        location: "Venezuela",
                        period: "2004 - 2006",
                        bullets: [
                            "Operated and calibrated analytical instruments including spectrometers, titrometers, and pH meters, maintaining measurement accuracy within manufacturer specifications through rigorous calibration schedules",
                            "Performed material analysis and quality control testing on raw materials and finished products, documenting results in compliance with ISO 9001 and ISO 17025 requirements",
                            "Conducted uncertainty calculations for laboratory measurements, contributing to accreditation documentation and ensuring measurement reliability for customer-reported results",
                            "Maintained laboratory environmental controls including temperature, humidity, and vibration monitoring, ensuring measurement conditions met specified requirements for accurate and repeatable results"
                        ]
                    }
                ],
                education: [
                    {
                        degree: "Bachelor's Degree in Electronic and Telecommunication Engineering",
                        institution: "Universidad de Los Andes, Venezuela",
                        period: "2005 - 2010"
                    },
                    {
                        degree: "Programming and PC Technical Support",
                        institution: "TVM-TV, Venezuela",
                        period: "2003 - 2004"
                    }
                ],
                certifications: [
                    "ISO 9001 Quality Management Systems",
                    "ISO 14001 Environmental Management Systems",
                    "ISO 17025 Laboratory Accreditation",
                    "Lean Manufacturing",
                    "Six Sigma"
                ],
                languages: [
                    {language: "Spanish", level: "Native"},
                    {language: "English", level: "Fluent"},
                    {language: "Portuguese", level: "Native"},
                    {language: "German", level: "Basic"}
                ]
            }
        };
        return cvData[category] || cvData.it_support;
    }

    generateTailoredCV(cvData, job) {
        let content = `${cvData.name}\n`;
        content += `${cvData.contact.location} | ${cvData.contact.phone} | ${cvData.contact.email}\n\n`;
        
        content += `PROFESSIONAL SUMMARY\n`;
        content += `${cvData.profile}\n\n`;
        
        content += `TECHNICAL SKILLS\n`;
        cvData.skills.forEach(skill => {
            content += `- ${skill}\n`;
        });
        content += `\n`;
        
        content += `PROFESSIONAL EXPERIENCE\n`;
        cvData.experience.forEach(exp => {
            content += `${exp.title}\n`;
            content += `${exp.company} | ${exp.location} | ${exp.period}\n`;
            exp.bullets.forEach(bullet => {
                content += `- ${bullet}\n`;
            });
            content += `\n`;
        });
        
        content += `EDUCATION\n`;
        cvData.education.forEach(edu => {
            content += `${edu.degree}\n`;
            content += `${edu.institution} | ${edu.period}\n\n`;
        });
        
        content += `CERTIFICATIONS & TRAINING\n`;
        cvData.certifications.forEach(cert => {
            content += `- ${cert}\n`;
        });
        content += `\n`;
        
        content += `LANGUAGES\n`;
        cvData.languages.forEach(lang => {
            content += `- ${lang.language}: ${lang.level}\n`;
        });
        
        return content;
    }

    updateApplicationStatus(jobId, status) {
        if (!this.applicationLog[jobId]) this.applicationLog[jobId] = {};
        this.applicationLog[jobId].status = status;
        this.applicationLog[jobId].updatedAt = new Date().toISOString();
        this.saveApplicationLog();
        this.renderJobs();
        this.updateStats();
        this.renderLog();
    }

    updateApplicationNotes(jobId, notes) {
        if (!this.applicationLog[jobId]) this.applicationLog[jobId] = {};
        this.applicationLog[jobId].notes = notes;
        this.applicationLog[jobId].updatedAt = new Date().toISOString();
        this.saveApplicationLog();
        this.renderLog();
    }

    toggleDiscard(jobId) {
        if (!this.applicationLog[jobId]) this.applicationLog[jobId] = {};
        const currentStatus = this.applicationLog[jobId].status;
        if (currentStatus === 'discarded') {
            this.applicationLog[jobId].status = 'not_applied';
        } else {
            this.applicationLog[jobId].status = 'discarded';
        }
        this.applicationLog[jobId].updatedAt = new Date().toISOString();
        this.saveApplicationLog();
        this.renderJobs();
        this.updateStats();
        this.renderLog();
    }

    async verifyLink(url) {
        if (this.linkCache[url] !== undefined) {
            return this.linkCache[url];
        }
        try {
            const response = await fetch(url, {
                method: 'HEAD',
                mode: 'no-cors',
                redirect: 'follow'
            });
            const isValid = response.ok || response.type === 'opaque';
            this.linkCache[url] = isValid;
            return isValid;
        } catch (e) {
            this.linkCache[url] = false;
            return false;
        }
    }

    async verifyAllLinks() {
        const btn = document.getElementById('verifyLinksBtn');
        if (btn) {
            btn.innerHTML = '<span>⏳</span> Verifying...';
            btn.disabled = true;
        }

        const allJobs = this.getAllJobs();
        let brokenCount = 0;
        let validCount = 0;

        for (const job of allJobs) {
            const applyValid = await this.verifyLink(job.applyUrl);
            const careerValid = await this.verifyLink(job.careerPage);

            if (!applyValid && !careerValid) {
                brokenCount++;
            } else {
                validCount++;
            }
        }

        if (btn) {
            btn.innerHTML = '<span>✅</span> Verified (' + validCount + ' OK, ' + brokenCount + ' broken)';
            btn.disabled = false;
        }

        return { valid: validCount, broken: brokenCount };
    }

    getApplyUrl(job) {
        if (this.linkCache[job.applyUrl] === false) {
            if (this.linkCache[job.careerPage] !== false) {
                return job.careerPage;
            }
            if (this.linkCache[job.website] !== false) {
                return job.website;
            }
        }
        return job.applyUrl;
    }

    getLinkStatusClass(url) {
        if (this.linkCache[url] === false) return 'link-broken';
        if (this.linkCache[url] === true) return 'link-ok';
        return 'link-unchecked';
    }

    updateStats() {
        const allJobs = this.getAllJobs();
        const showDiscarded = this.currentFilters.showDiscarded;
        const countByCategory = (cat) => allJobs.filter(j => {
            if (j.category !== cat) return false;
            const status = this.applicationLog[j.id] ? this.applicationLog[j.id].status : 'not_applied';
            if (!showDiscarded && (status === 'discarded' || status === 'rejected')) return false;
            return true;
        }).length;
        document.getElementById('itSupportCount').textContent = countByCategory('it_support');
        document.getElementById('maintenanceCount').textContent = countByCategory('maintenance');
        document.getElementById('metrologyCount').textContent = countByCategory('metrology');
        const appliedCount = Object.values(this.applicationLog).filter(log => log.status === 'applied' || log.status === 'interview').length;
        document.getElementById('appliedCount').textContent = appliedCount;
        document.getElementById('logBadge').textContent = appliedCount;
    }

    updateLastUpdated() {
        const date = new Date(this.jobsData.lastUpdated);
        document.getElementById('lastUpdated').textContent = 'Last updated: ' + date.toLocaleDateString();
    }

    toggleLog() {
        const sidebar = document.getElementById('logSidebar');
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) this.renderLog();
    }

    renderLog() {
        const content = document.getElementById('logContent');
        const allJobs = this.getAllJobs();
        const appliedJobs = allJobs.filter(job => {
            const log = this.applicationLog[job.id];
            return log && log.status && log.status !== 'not_applied';
        });
        if (appliedJobs.length === 0) {
            content.innerHTML = '<div class="empty-state" style="padding:2rem;"><span style="font-size:2rem;">📋</span><h3 style="font-size:1rem;">No applications yet</h3><p style="font-size:0.875rem;">Start applying to track your progress</p></div>';
            return;
        }
        let html = '';
        appliedJobs.forEach(job => {
            const log = this.applicationLog[job.id];
            html += '<div class="log-entry">' +
                '<div class="log-entry-header">' +
                    '<span class="log-entry-company">' + job.company + '</span>' +
                    '<span class="log-entry-date">' + new Date(log.updatedAt).toLocaleDateString() + '</span>' +
                '</div>' +
                '<div class="log-entry-position">' + job.position + '</div>' +
                '<span class="log-entry-status status-' + log.status + '">' + this.formatStatus(log.status) + '</span>';
            if (log.notes) {
                html += '<div class="log-entry-notes">"' + log.notes + '"</div>';
            }
            html += '</div>';
        });
        content.innerHTML = html;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new JobPortal();
});
