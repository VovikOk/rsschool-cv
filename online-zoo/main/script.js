document.getElementById('button_friend').onclick = function () {
    document.location.href = "online-zoo/donate/index.html";
}

document.getElementById('button_footer').onclick = function () {
    document.location.href = "online-zoo/donate/index.html";
}

document.getElementById("footer_email").addEventListener('input', (event) => {
    const val = event.target.value;
    if (val.includes('@') || val === '') { document.getElementById("footer_but").disabled = true;        
    } else {document.getElementById("footer_but").disabled = false;}
})
