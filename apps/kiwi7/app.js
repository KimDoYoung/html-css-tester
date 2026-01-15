document.addEventListener('alpine:init', () => {
    Alpine.data('stockApp', () => ({
        currentTab: 'dashboard', // dashboard, kiwoom, ls, kis
        sidebarOpen: window.innerWidth >= 768,

        // Mock Data for Accounts
        accounts: {
            kiwoom: {
                name: 'Kiwoom Securities',
                id: 'kiwoom',
                balance: 15400000,
                dailyPL: 320000,
                holdings: [
                    { name: 'Samsung Elec', code: '005930', qty: 100, avg: 72000, cur: 74500 },
                    { name: 'SK Hynix', code: '000660', qty: 50, avg: 130000, cur: 132000 },
                    { name: 'Naver', code: '035420', qty: 20, avg: 210000, cur: 205000 }
                ]
            },
            ls: {
                name: 'LS Securities',
                id: 'ls',
                balance: 8500000,
                dailyPL: -150000,
                holdings: [
                    { name: 'Posco Holdings', code: '005490', qty: 15, avg: 450000, cur: 440000 },
                    { name: 'LG Energy', code: '373220', qty: 10, avg: 400000, cur: 410000 }
                ]
            },
            kis: {
                name: 'KIS (Korea Inv)',
                id: 'kis',
                balance: 22000000,
                dailyPL: 1200000,
                holdings: [
                    { name: 'Hyundai Motor', code: '005380', qty: 40, avg: 190000, cur: 250000 },
                    { name: 'Kia', code: '000270', qty: 60, avg: 85000, cur: 110000 },
                    { name: 'Kakao', code: '035720', qty: 100, avg: 55000, cur: 52000 }
                ]
            }
        },

        // Trading Form State
        activeAccountTab: 'balance', // balance, order, history
        orderType: 'buy', // buy, sell
        orderForm: {
            code: '',
            qty: 0,
            price: 0
        },

        init() {
            // Responsive sidebar handling
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    this.sidebarOpen = true;
                } else {
                    this.sidebarOpen = false;
                }
            });
        },

        get currentAccountData() {
            return this.accounts[this.currentTab];
        },

        get totalAssets() {
            let total = 0;
            Object.values(this.accounts).forEach(acc => total += acc.balance);
            return total;
        },

        get totalDailyPL() {
            let total = 0;
            Object.values(this.accounts).forEach(acc => total += acc.dailyPL);
            return total;
        },

        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
            document.body.classList.toggle('sb-sidenav-toggled', !this.sidebarOpen);
        },

        switchTab(tabId) {
            this.currentTab = tabId;
            this.activeAccountTab = 'balance'; // Reset internal tab when switching accounts
            // On mobile, close sidebar after selection
            if (window.innerWidth < 768) {
                this.toggleSidebar();
            }
        },

        formatNumber(num) {
            return new Intl.NumberFormat('ko-KR').format(num);
        },

        getPLColor(val) {
            if (val > 0) return 'text-profit';
            if (val < 0) return 'text-loss';
            return 'text-muted';
        },

        getProfitRate(avg, cur) {
            return ((cur - avg) / avg * 100).toFixed(2);
        },

        submitOrder() {
            alert(`Order Submitted: ${this.orderType.toUpperCase()} ${this.orderForm.code} - ${this.orderForm.qty}ea @ ${this.orderForm.price}`);
            // Reset form
            this.orderForm = { code: '', qty: 0, price: 0 };
        }
    }))
});
