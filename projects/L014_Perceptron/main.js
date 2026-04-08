let currentR, currentG, currentB;
        let totalCount = 0;

        function getRandomRGB() {
            return Math.floor(Math.random() * 256);
        }

        function generaNuovoColore() {
            currentR = getRandomRGB();
            currentG = getRandomRGB();
            currentB = getRandomRGB();
            
            const rgbString = `rgb(${currentR}, ${currentG}, ${currentB})`;
            document.querySelector('#color-box').style.backgroundColor = rgbString;
            document.querySelector('#rgb-text').innerText = `R: ${currentR}, G: ${currentG}, B: ${currentB}`;
        }

        function registra(etichetta) {
            const tbody = document.querySelector('#data-table');
            const row = document.createElement('tr');

            if (etichetta === 'Non so') {
                row.className = 'row-nonso';
            }

            row.innerHTML = `
                <td>${currentR}</td>
                <td>${currentG}</td>
                <td>${currentB}</td>
                <td><strong>${etichetta}</strong></td>
            `;

            tbody.prepend(row);

            totalCount++;
            document.querySelector('#count').innerText = totalCount;

            generaNuovoColore();
        }

        function pulisci() {
            document.querySelector('#data-table').innerHTML = '';
            totalCount = 0;
            document.querySelector('#count').innerText = totalCount;
        }

        window.onload = generaNuovoColore;