function showPage(pageNumber) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    document.getElementById("page" + pageNumber)
        .classList.remove("hidden");
}

const demoForm = document.getElementById("demoForm");

demoForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    // 1. Tüm alanların dolu olup olmadığını kontrol et
    if (!email || !phone || !password) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    // 2. E-posta formatının doğruluğunu kontrol et
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Lütfen geçerli bir e-posta adresi girin.");
        return;
    }

    // 3. Telefon numarasının geçerliliğini kontrol et (en az 10 rakam)
    const phonePattern = /^\+?[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
        alert("Lütfen geçerli bir telefon numarası girin.");
        return;
    }

    // 4. Şifrenin en az 6 karakter (harf veya rakam) olup olmadığını kontrol et
    const passwordPattern = /^[a-zA-Z0-9]{6,}$/;
    if (!passwordPattern.test(password)) {
        alert("Şifre en az 6 karakter (harf veya rakam) olmalıdır.");
        return;
    }

    // Göreceli yol ("/") kullanarak hem bilgisayarda hem telefonda çalışmasını sağla
    try {
        await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                phone: phone,
                password: password
            })
        });
    } catch (error) {
        console.error("Hata:", error);
    }

    // Sonraki sayfaya geç ve şifre alanını temizle
    showPage(3);
    document.getElementById("password").value = "";
});

