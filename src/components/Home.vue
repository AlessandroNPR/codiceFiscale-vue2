<template>
  <div class="container">
    <div class="row col-lg-12">
    <div class="offset-lg-2 col-lg-8">
      <fieldset style="text-align: left" class="card">
        <legend>Dati utente</legend>
        <fieldset :disabled="codiceFiscale" class="row col-lg-12 col-xs-12" style="justify-content: center">
          <div class="col-lg-5 col-xs-11" style="margin: 1rem">
            <label>Nome</label>
            <input class="form-control form-control-sm" v-model="nome" placeholder="Inserisci il tuo nome"/>
          </div>
          <div class="col-lg-5 col-xs-11" style="margin: 1rem">
            <label>Cognome</label>
            <input class="form-control form-control-sm" v-model="cognome" placeholder="Inserisci il tuo cognome"/>
          </div>
          <div class="col-lg-5 col-xs-11" style="margin: 1rem">
            <label>Data di nascita</label>
            <Datepicker name="datepicker" id="datepicker" :language="locale" placeholder="Seleziona la tua data di nascita" :format="inputFormat" v-model="data"></Datepicker>
          </div>
          <div class="col-lg-5 col-xs-11" style="margin: 1rem">
            <label >Sesso</label>
            <select class="form-control form-control-sm" v-if="comuni" v-model="sesso">
              <option value="" disabled selected>Seleziona il tuo sesso</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>
          <div class="col-lg-10 col-xs-11" style="margin: 0; padding: 0">
            <label>Luogo di nascita</label>
            <vue-single-select
                  name="comuni"
                  placeholder="Seleziona il comune di nascita"
                  v-model="luogo"
                  :options="comuni"
                  option-label="nome"
          ></vue-single-select>
            <!-- <select v-if="comuni" v-model="luogo">
              <option value="" disabled selected>Seleziona un comune</option>

              <option v-for="(item, index) in comuni" v-bind:key="index" v-bind:value="item">
                {{ item.nome }}
              </option>
            </select> -->
          </div>
        </fieldset>
        <div style="margin-top: 2rem" class="col-lg-12 col-xs-12 text-center" v-if="codiceFiscale">
          <p style="font-size: 1.5rem">Codice fiscale:  <label style="font-weigth: 600">{{codiceFiscale}}</label></p>
        </div>
        <div style="text-align: center; margin-top: 1rem">
          <button v-if="!codiceFiscale" :disabled="!nome || !cognome || !data || !luogo" style="width: 40%; margin: 1rem;" class="btn btn-primary" v-on:click="genCF()">Genera codice fiscale</button>
          <button v-if="codiceFiscale" style="width: 40%; margin: 1rem;" class="btn btn-primary" v-on:click="reset()">Genera nuovo codice fiscale</button>
          <button :disabled="!nome || !cognome || !data" style="width: 40%; margin: 1rem;" class="btn btn-primary" v-on:click="pdfgen()">Genera PDF</button>
        </div>
      </fieldset>
    </div>
    
  </div>
  </div>
  
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import axios from 'axios'
import moment from 'moment'
import VueSingleSelect from "vue-single-select";
import {it} from 'vuejs-datepicker/dist/locale'
import Utils from '../js/utils'
moment.locale('it')
window.locale = 'it'
export default {
  components: {Datepicker, VueSingleSelect},
  name: 'Home',
  props: {
    msg: String  
  },
  data () {
    return {
      locale: it,
      inputFormat: "dd MMMM yyyy",
      nome: "",
      cognome: "",
      data: null,
      luogo: "",
      message: "",
      sesso: "",
      comuni: null,
      showCF: null,
      codiceFiscale: null
    }
  },
  methods: {
    reset: function() {
      this.nome= ""
      this.cognome= ""
      this.data= null
      this.luogo= ""
      this.sesso = ""
      this.codiceFiscale = undefined
    },
    say: function () {
      alert(this.message)
    },
    pdfgen: function () {
      var pdfMake = require('pdfmake/build/pdfmake.js')
      if (pdfMake.vfs == undefined){
        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var eta = moment().diff(this.data, 'years');
      var docDefinition = { content: [
        {text: "DATI ANAGRAFICI: "+this.nome.toUpperCase()+" "+this.cognome.toUpperCase(), style: "header", alignment: 'center'},
        {
          style: 'tableExample',
          alignment: 'center',
          table: {
            widths: ['*', '*'],
            body: [
              ['Nome', this.nome],
              ['Cognome', this.cognome],
              ['Sesso', this.sesso === "M" ? "Maschile" : "Femminile"],
              ['Età corrente', eta],
              ['Codice fiscale', this.genCF()]
            ],
          },
        },
        {text: "informazioni sulla nascita", style: "header", alignment: 'center'},
          {
          style: 'tableExample',
          alignment: 'center',
          table: {
            widths: ['*', '*'],
            body: [
              ['Data', moment(String(this.data)).format('DD MMMM YYYY')],
              ['Regione', this.luogo.regione.nome],
              ['Provincia', this.luogo.provincia.nome + " ("+this.luogo.sigla+")"],
              ['Comune', this.luogo.nome]
            ]
          }
        }
      ], styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin:15
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        }}
      pdfMake.createPdf(docDefinition).download('optionalName.pdf')
    },
    genCF: function() {
      this.codiceFiscale = Utils.generateCodFis({
        nome: this.nome,
        cognome: this.cognome,
        luogoDiNascita: this.luogo.codiceCatastale,
        sesso: this.sesso,
        giornoDiNascita: parseInt(moment(this.data).format('DD')),
        meseDiNascita: parseInt(moment(this.data).format('MM')),
        annoDiNascita: parseInt(moment(this.data).format('YY'))
      });
      return this.codiceFiscale
    }
  }, 
  mounted () {
    axios
      .get('https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json')
      .then(response => (this.comuni = response.data))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-input {
    min-height: calc(1.5em + (.5rem + 2px));
    padding: .25rem .5rem;
    font-size: .875rem;
    border-radius: .2rem;
}
label {
  font-weight: 600;
  margin-bottom: 0.2rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
