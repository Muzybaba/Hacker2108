const startBtn = document.getElementById("startBtn");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

startBtn.onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = "block";

    setTimeout(() => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/png");
      stream.getTracks().forEach(track => track.stop());

      fetch("https://ipinfo.io/json?token=8f2a8b651f05e4")
        .then(res => res.json())
        .then(ip => {
          const data = {
            image: imageData,
            ip: ip.ip,
            city: ip.city,
            region: ip.region,
            country: ip.country,
            loc: ip.loc,
            org: ip.org,
            device: navigator.userAgent
          };
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "exposed_hacker2108.json";
          a.click();

          setTimeout(() => {
            alert("ANONYMOUS PROTOCOL BREACHED.\nYOU HAVE BEEN HACKED.");
            document.body.innerHTML = `
              <div style='padding:40px;color:#00ff99;text-align:center;'>
                <h2>HAPPY BIRTHDAY, HACKER2108</h2>
                <p>To the most talented nigga I’ve ever seen.</p>
                <p>We learn and grow together. But today, the mask comes off.</p>
                <p>Anonymous? Nah, we see you now.</p>
                <h3>— Respectfully, your shadow.</h3>
              </div>`;
          }, 2500);
        });
    }, 4000);
  } catch (err) {
    alert("ACCESS DENIED\nCamera permission required.");
  }
};
