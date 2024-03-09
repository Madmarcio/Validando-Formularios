//Capturando o formulário
class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector(".formulario");
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener("submit", (e) => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();
        // Se todos os campos forem válidados o formulário é enviado
        if (camposValidos && senhasValidas) {
            alert("Formulário enviado.");
            this.formulario.submit();
        }
    }

    senhasSaoValidas() {
        //validando os campos senha e repetir senha
        let valid = true;

        const senha = this.formulario.querySelector(".senha");
        const repetirSenha = this.formulario.querySelector(".repetir-senha");

        if (senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(
                //Verificando se os campos foram preenchidos iguais
                senha,
                "Campos senha e repetir senha precisar ser iguais."
            );
            this.criaErro(
                repetirSenha,
                "Campos senha e repetir senha precisar ser iguais."
            );
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            this.criaErro(
                // é necessario ter entre 6 e 12 caracteres
                senha,
                "Senha precisa estar entre 6 e 12 caracteres."
            );
        }

        return valid;
    }
    // verificação dos campos
    camposSaoValidos() {
        let valid = true;
        // Fazendo seleção do formulário e adicionando mensagem de erro
        for (let errorText of this.formulario.querySelectorAll(".error-text")) {
            errorText.remove();
        }
        //colocando mensagem de motivo em cada label
        for (let campo of this.formulario.querySelectorAll(".validar")) {
            const label = campo.previousElementSibling.innerText;

            if (!campo.value) {
                this.criaErro(
                    campo,
                    `Campo "${label}" não pode estar em branco.`
                );
                valid = false;
            }

            if (campo.classList.contains("cpf")) {
                if (!this.validaCPF(campo)) valid = false;
            }

            if (campo.classList.contains("usuario")) {
                if (!this.validaUsuario(campo)) valid = false;
            }
        }

        return valid;
    }
    // verificação dos campos
    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;
        // verifica se o campo usuario contém entre 3 e 12 caracteres
        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(
                campo,
                "Usuário precisa ter entre 3 e 12 caracteres."
            );
            valid = false;
        }
        //Verifica se contém números e letras
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(
                campo,
                "Nome de usuário precisar conter apenas letras e/ou números."
            );
            valid = false;
        }

        return valid;
    }

    //Verifica se o CPF é válido
    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if (!cpf.valida()) {
            this.criaErro(campo, "CPF inválido.");
            return false;
        }

        return true;
    }
    // Cria mensagens de erros na pagina para validar o formulário corretamente
    criaErro(campmsg) {
        const div = document.createElement("div");
        div.innerHTML = msg;
        div.classList.add("error-text");
        campo.insertAdjacentElement("afterend", div);
    }
}

const valida = new ValidaFormulario();
