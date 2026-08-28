// ===============================
// EFEITO 3D DO CARD
// ===============================

const card = document.querySelector(".card");

card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = (x - centerX) / 15;
    const rotateX = -(y - centerY) / 15;

    card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
    `;
});

card.addEventListener("mouseleave", () => {
    card.style.transform = `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
    `;
});


// ===============================
// DISCORD
// ===============================

const discordId = "893084148707766292";


// ===============================
// AVATAR + BADGES
// ===============================

fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
    .then(res => {
        console.log("Status:", res.status);
        return res.json();
    })

    .then(data => {

        console.log("Dados do Discord:", data);

        if (!data.success) {
            console.log("Usuário não encontrado no Lanyard.");
            return;
        }

        const user = data.data.discord_user;

        // ===============================
        // AVATAR
        // ===============================

        const avatar = user.avatar;
        const foto = document.querySelector(".foto");

        let imagem;

        if (avatar) {

            const formato = avatar.startsWith("a_")
                ? "gif"
                : "png";

            imagem =
                `https://cdn.discordapp.com/avatars/${user.id}/${avatar}.${formato}?size=512`;

        } else {

            imagem =
                "https://cdn.discordapp.com/embed/avatars/0.png";
        }

        if (foto) {
            foto.src = imagem;
            console.log("Avatar carregado!");
        }


        // ===============================
        // BADGES
        // ===============================

        const badges = user.public_flags;

        const area = document.querySelector(".badges");

        const lista = {

            1: "staff",

            2: "partner",

            4: "hypesquad",

            8: "bughunter",

            64: "bravery",

            128: "brilliance",

            256: "balance",

            512: "early_supporter",

            16384: "verified_bot_developer",

            4194304: "active_developer"

        };


        if (area) {

            area.innerHTML = "";

            for (const id in lista) {

                if (badges & Number(id)) {

                    const img = document.createElement("img");

                    img.src =
                        `assets/badges/${lista[id]}.png`;

                    img.alt = lista[id];

                    area.appendChild(img);
                }
            }
        }

    })

    .catch(erro => {

        console.error(
            "Erro ao buscar dados do Discord:",
            erro
        );

    });