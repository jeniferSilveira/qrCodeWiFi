document.addEventListener('DOMContentLoaded', function() {
    // Adiciona evento para tecla Enter nos botões
    document.getElementById('gerarBtn').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita o envio de formulário
            gerarQRCode();
        }
    });

    // Adiciona evento para clique no botão Gerar QR Code
    document.getElementById('gerarBtn').addEventListener('click', function(event) {
        event.preventDefault(); // Evita o envio de formulário
        gerarQRCode();
    });

    // Função para gerar QR Code
    function gerarQRCode() {
        const ssid = document.getElementById('ssid').value;
        const senha = document.getElementById('senha').value;

        if (ssid === '' || senha === '') {
            alert('Preencha todos os campos!');
            return;
        }

        // Remover o QR Code anterior, se existir
        document.getElementById('qrcode').innerHTML = '';

        // Gerar o novo QR Code
        const qrcode = new QRCode(document.getElementById('qrcode'), {
            text: `WIFI:T:WPA;S:${ssid};P:${senha};;`,
            width: 200,
            height: 200,
            correctLevel : QRCode.CorrectLevel.H
        });

        // Remover o botão de download anterior, se existir
        const existingBtn = document.getElementById('downloadBtn');
        if (existingBtn) {
            existingBtn.parentNode.removeChild(existingBtn);
        }

        // Adicionar botão de download do QR Code
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Salvar como PNG';
        downloadBtn.id = 'downloadBtn'; // Adicionar um id para facilitar a remoção futura
        downloadBtn.classList.add('btn', 'btn-dark', 'mt-3');
        downloadBtn.addEventListener('click', function() {
        const canvas = document.querySelector('#qrcode canvas');
              canvas.toBlob(function(blob) {
              saveAs(blob, 'qrcode.png');
            });
        });
        document.getElementById('container').appendChild(downloadBtn);
    }
});