import CodiceIdentificativo from "./codiceIdentificativo";

const mouth = new Map([
    [1, "A"], 
    [2, "B"], 
    [3, "C"],
    [4, "D"],
    [5, "E"],
    [6, "H"],
    [7, "L"],
    [8, "M"],
    [9, "P"],
    [10, "R"],
    [11, "S"],
    [12, "T"]
]);

export default {
    generateCodFis({nome, cognome, giornoDiNascita, sesso, meseDiNascita, annoDiNascita, luogoDiNascita}) {
        let partialCode = (this.getCognome(cognome) 
        + this.getNome(nome)
        + annoDiNascita
        + this.getMouth(meseDiNascita) 
        + this.getDay(giornoDiNascita, sesso) + luogoDiNascita).toUpperCase(); 
        return partialCode + CodiceIdentificativo.getCodiceIdentificativo(partialCode);
    },
    getNome(nome){
        var nomeFiltered = nome.replace(/\s/g, '')
        var consonanti = this.getConsonanti(nomeFiltered);
        var vocali = this.getVocali(nomeFiltered);
        if(consonanti.length > 3) {
            consonanti = consonanti.filter(function(char, index){return index !== 1});
        }
        var generatore = this.convalidaArray(consonanti.concat(vocali), 3, 'x').join('');
        return generatore.toUpperCase();
    },
    getCognome (cognome){
        var cognomeFiltered = cognome.replace(/\s/g, '')
        var consonanti = this.getConsonanti(cognomeFiltered);
        var vocali = this.getVocali(cognomeFiltered);
        var generatore = this.convalidaArray(consonanti.concat(vocali), 3, 'x').join('');
        return generatore.toUpperCase();
    },
    convalidaArray(array, newLength, element) {
        while(array.length < newLength) {
          array.push(element);
        }
        array.length = newLength;
        return array
    },
    getConsonanti (string) {
        if (string) {
            var testo = string.toLowerCase()
            var listaConsonanti = []
            for (var i = 0; i < testo.length; i++) {
                if (testo[i] !== 'a' && testo[i] !== 'e' && testo[i] !== 'i' && testo[i] !== 'o' && testo[i] !== 'u' && testo[i] !== '\'') {
                    listaConsonanti.push(testo[i])
                }
            }
            return listaConsonanti
        }
    },
    getVocali (string) {
        if (string) {
            var testo = string.toLowerCase()
            var listaVocali = []
            for (var i = 0; i < testo.length; i++) {
                if (testo[i] === 'a' || testo[i] === 'e' || testo[i] === 'i' || testo[i] === 'o' || testo[i] === 'u') {
                    listaVocali.push(testo[i])
                }
            }
            return listaVocali;
        }
    },
    getDay (giornoDiNascita, sesso) {
        if (sesso.toUpperCase() === "M"){
            return giornoDiNascita.toString().length === 1 ? ("0"+giornoDiNascita) : giornoDiNascita.toString() 
        } else {
            return (giornoDiNascita + 40).toString()
        }
    },
    getMouth (meseDiNascita) {
        return mouth.get(meseDiNascita);
    }
}