
document.getElementById("pick_input").addEventListener('input', (event) => {
    const value = String(event.target.value);
    if (value.length > 4) { document.getElementById("pick_input").value = +value.slice(0, 4);        
    }
})

document.getElementById("footer_email").addEventListener('input', (event) => {
    const val = event.target.value;
    if (val.includes('@') || val === '') { document.getElementById("footer_but").disabled = true;        
    } else {document.getElementById("footer_but").disabled = false;}
})






