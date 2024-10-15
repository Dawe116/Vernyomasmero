const usersData = {};

        function classifyBloodPressure(systolic, diastolic) {
            if (systolic < 90 || diastolic < 60) return 'Alacsony vérnyomás';
            if (systolic <= 120 && diastolic <= 80) return 'Normális vérnyomás';
            if (systolic <= 139 || diastolic <= 89) return 'Prehypertension';
            if (systolic <= 159 || diastolic <= 99) return '1. fokú hipertónia';
            if (systolic >= 160 || diastolic >= 100) return '2. fokú hipertónia';
        }

        function recordBloodPressure() {
            const name = document.getElementById('name').value;
            const systolic = parseInt(document.getElementById('systolic').value);
            const diastolic = parseInt(document.getElementById('diastolic').value);
            const pulse = parseInt(document.getElementById('pulse').value);
            const date = new Date().toLocaleDateString();
            
            if (!name || isNaN(systolic) || isNaN(diastolic) || isNaN(pulse)) {
                alert('Kérjük, töltsön ki minden mezőt!');
                return;
            }

            const category = classifyBloodPressure(systolic, diastolic);

            if (!usersData[name]) usersData[name] = [];

            usersData[name].push({ date, systolic, diastolic, pulse, category });

            updateTable();
        }

        function updateTable() {
            const tbody = document.querySelector('#dataTable tbody');
            tbody.innerHTML = ''; 

            for (const user in usersData) {
                usersData[user].forEach(entry => {
                    const row = `<tr>
                        <td>${entry.date}</td>
                        <td>${entry.systolic}</td>
                        <td>${entry.diastolic}</td>
                        <td>${entry.pulse}</td>
                        <td>${entry.category}</td>
                    </tr>`;
                    tbody.innerHTML += row;
                });
            }
        }

        function downloadData() {
            let csvContent = "data:text/csv;charset=utf-8,Dátum,Szisztolé,Diasztolé,Impulzus,Kategória\n";

            for (const user in usersData) {
                csvContent += `Felhasználó: ${user}\n`;
                usersData[user].forEach(entry => {
                    csvContent += `${entry.date},${entry.systolic},${entry.diastolic},${entry.pulse},${entry.category}\n`;
                });
                csvContent += '\n';
            }

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'vernyomas_adatok.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }