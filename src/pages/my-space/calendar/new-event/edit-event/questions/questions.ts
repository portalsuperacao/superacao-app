import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-calendar-event-questions',
  templateUrl: 'calendar-questions.html',
})

export class CalendarEventQuestionsPage {
  consult;
  titles;

  constructor(public viewCtrl: ViewController) {
    this.titles = ["Diagnóstico", "Expectativas futuras", "Tratamentos",  "Medicamentos", "Alimentação"]
    this.consult = [
      {
        consult: [
          "Que tipo de câncer eu tenho? Onde está localizado?",
          "Preciso fazer mais exames ou procedimentos para investigar esse diagnóstico?",
          "Esse câncer tem alguma causa específica?",
          "Ele pode causar metástases?",
          "Qual é o estágio da minha doença?",
          "A doença pode progredir? E regredir?",
          "Quais sintomas são comuns neste tipo de câncer?",
          "Como posso evitar ou diminuir esses sintomas no meu dia a dia?",
          "Se esses sintomas piorarem o que devo fazer?",
          "Como devo falar sobre minha doença com minha familia?"
        ]
      },

      {
        consult: [
          "Qual é o meu prognóstico?",
          "Podemos falar em cura para o meu câncer?",
          "Se eu não puder ser curada, vou viver mais tempo com o tratamento?",
          "Como eu vou me sentir durante o tratamento?",
          "Quais são as chances do câncer voltar?  E de expandir para outras áreas? O que faremos se isso acontecer?",
          "Poderei ter filhos após o tratamento?"
        ]
      },

      {
        consult: [
          "Preciso fazer outros exames antes de decidirmos sobre o tratamento?",
          "Qual o tratamento recomendado para minha doença?",
          "Por que eu preciso fazer esse tratamento? Existem outras opções de tratamento?",
          "Quanto tempo dura?",
          "Quais os riscos e benefícios?",
          "Quais os efeitos colaterais esperados? Devo ficar atenta para algum sintoma suspeito?",
          "Quantas vezes eu farei esse procedimento?",
          "Quantos exames precisarei fazer e quantas vezes?",
          "Terei que ficar internado em hospital para fazer o tratamento?",
          "Durante o tratamento terei que fazer alguma alteração em minha rotina de trabalho, vida familiar e vida sexual?",
          "É possível realizar atividades físicas durante o tratamento?",
          "Poderei manter relações sexuais durante o tratamento?",
          "Poderei tomar Sol durante o tratamento?",
          "Para quem devo ligar se tiver dúvidas e problemas relativos ao tratamento?",
          "Quais as opções que eu tenho, se eu não quero continuar meu tratamento?"
        ]
      },

      {
        consult: [
          "Quais são os nomes dos medicamentos que eu vou tomar? Para que servem?",
          "Quais os efeitos colaterais posso sentir ao tomar as medicações?",
          "Posso tomar outros remédios ao mesmo tempo desta medicação?"
        ]
      },

      {
        consult: [
          "Precisarei seguir dieta específica ?",
          "Existem alimentos que devo comer durante o tratamento?",
          "Existem alimentos proibidos durante o durante o tratamento",
          "Posso ingerir álcool durante o tratamento?"
        ]
      }
    ];
  }

  clickQuestion(question) {
    this.viewCtrl.dismiss({"question": question})
  }

  closePage() {
    this.viewCtrl.dismiss();
  }
}
