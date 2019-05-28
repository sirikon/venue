const talks = {

    'como-hacer-un-videojuego-en-48-horas': {
        name: 'Cómo hacer un videojuego en 48 horas',
        description: [
            '¿Es posible crear un videojuego en un fin de semana? ¿Cómo?',
            'En esta charla veremos herramientas, consejos y trucos para participar en la Ludum Dare, una competición desarrollo donde se crea un videojuego desde cero en 48 horas.'
        ],
        speaker: 'Belén Albeza',
        speakerTitle: [
            'Belén es ingeniera informática y trabaja como desarrolladora en Mozilla, en el equipo de Firefox DevTools.',
            'Anteriormente ha trabajado en start-up’s y corporaciones de Londres y Barcelona, creando videojuegos, aplicaciones de móviles, prototipos de I+D, aplicaciones web, etc...',
            'En su tiempo libre le gusta seguir creando pequeños videojuegos, tocar la guitarra y jugar al Mass Effect.'
        ],
        when: '10:00-10:50'
    },

    'he-fracasado-tengo-mas-de-30-y-sigo-programando': {
        name: 'He fracasado: tengo más de 30 y sigo programando',
        description: [
            'Y es probable que llegue a los 40 y siga siendo el caso: seguiré siendo programadora.',
            'Durante mis estudios y los primeros años de trabajo, de diversas maneras más o menos sutiles, mi entorno me hizo pensar lo siguiente: para tener una carrera profesional considerada de éxito, debes de ser "manager", "jefa de proyecto"... algo que no implique programar. Y a poder ser antes de los 30. Ni siquiera lo he intentado porque no es lo que quiero. ¿Soy un bicho raro?',
            'Rompamos los mitos. En esta charla compartiré mis experiencias, las lecciones que he aprendido en estos últimos +10 años y lo que para mí significa realmente ser programador.',
            'Además os daré algunos trucos para no estancarse y salir de la zona de confort de forma agradable. Para que un día todos y todas llevemos con orgullo el titulo de "programador" en nuestra solapa.',
            'Yes we code!'
        ],
        speaker: 'Katia Aresti',
        speakerTitle: [
            'Ingeniera Informática por la Universidad de Deusto, Katia trabaja desde hace años como programadora backend java/scala principalmente.',
            'Desde 2017 trabaja en Red Hat en el equipo Infinispan/Datadrid, ocupándose de la integración con Spring-Boot y Vert.x.',
            'Co-organizadora de Duchess Francia (meetup para conectar mujeres tech), participa como ponente sobre diversos temas tanto técnicos (java, testing, arquitecturas de streaming, infinispan) como relacionados con la carrera profesional.'
        ],
        when: '11:00-11:50'
    },

    'metatypo-redefiniendo-la-tipografia': {
        name: 'METATYPO: Redefiniendo la tipografía',
        description: [
            'La tipografía digital es más que un conjunto de letras, es un pequeño software que puede programarse y con un gran potencial creativo.',
            'En METATYPO exploramos todas esas posibilidades al mismo tiempo que creamos un marco teórico y práctico a través de casos de estudio.'
        ],
        speaker: 'Rubén Chumillas y Álvaro Recuenco',
        speakerTitle: [
            'Rubén Chumillas:',
            'Dirección de Arte y Creatividad Visual en Estudio Rubén Chumillas.',
            'Dirección de Arte y Diseño Gráfico en Santillana Educación.',
            'Nominación Grammy Latino al mejor diseño de álbum 2018 (Mismo Sitio, Distinto Lugar - Vetusta Morla)',
            'Varios premios Laus 2014, 2015, 2017.',
            'Investigación y teoría: Creación, dirección y coordinación de la plataforma digital de investigación centrada en tipografía y diseño experimental METATYPO.',
            'Álvaro Recuenco:',
            'Diseñador Gráfico en Dir. de Arte de Santillana y Diseñador Full-Stack Freelance.',
            'Colaborador en la web de “ESD Madrid".',
            'Colaborador en el proyecto “Metatypo”.'
        ],
        when: '12:35-13:25'
    },

    'como-desarrollar-bots-para-google-assistant': {
        name: 'Cómo desarrollar bots para Google Assistant',
        description: [
            'Los asistentes virtuales han llegado, y parece que para quedarse.',
            'Google ofrece todo un stack de tecnologías para que podamos desarrollar nuestras propias apps para Google Assistant, y además, es realmente sencillo.',
            'En esta charla explico todo lo que he aprendido durante el desarrollo de dos juegos: RIC Escape y La Anomalía Dimensional, que explotan mucho de lo que este stack puede ofrecer.'
        ],
        speaker: 'Jordi Martí',
        speakerTitle: [
            'Desarrollador en Grupo INIT, Jordi trabaja principalmente desarrollando productos digitales relacionados con la salud.',
            'Cree firmemente en aportar valor a través del aprendizaje, del trabajo en equipo y de la pasión.',
            'Su vida profesional y sus últimos pet projects le han llevado a explorar el mundo de los bots y asombrarse con el potencial de éstos.'
        ],
        when: '13:35-14:25'
    },

    'unbiasing-teams-un-tour-por-la-psicología-aplicada-a-equipos': {
        name: 'Unbiasing Teams. Un tour por la psicología aplicada a equipos',
        description: [
            'Hablaremos de situaciones diarias que tenemos en los equipos y vemos como normales pero que en realidad están fundamentadas en esquemas y estereotipos que gobiernan nuestras decisiones.',
            'Contaré sesgos, falacias y otros factores psicológicos que nos afectan en el día.'
        ],
        speaker: 'Félix López',
        speakerTitle: [
            'Félix es actualmente engineering manager en Google. Lleva más de 17 años desarrollando software en los que ha pasado por desarrollo web, programación de videojuegos, sistemas distribuidos, fintech, etc...',
            'Ha desempeñado roles como desarrollador, team lead, director técnico o engineering manager.',
            'Pasa los días leyendo sobre sistemas distribuidos, management y psicología.'
        ],
        when: '16:00-16:50'
    },

    'pensando-cristalino': {
        name: 'Pensando cristalino',
        description: [
            '¿Cómo ven las máquinas los cristales? Con un poco de JavaScript y Tensorflow vamos a crear arte generativo, todo paso a paso.',
            '¡De aquí al Museo del Prado!'
        ],
        speaker: 'Bea Hernández',
        speakerTitle: [
            'Data Scientist en Olympic Channel. Miembro de NASADatanauts (Comunidad oficial de NASA donde se trabaja con el Open Data de la NASA) y co-organizadora R-Ladies Madrid.'
        ],
        when: '17:00-17:50'
    },

    'a-journey-building-trust-the-growth': {
        name: 'A Journey Building Trust: The Growth',
        description: [
            'En mi equipo desarrollamos una herramienta para ayudar a los usuarios a comprender el verdadero coste al mover dinero entre diferentes divisas.',
            'Con esta charla quiero compartir el nacimiento y maduración de este producto y traer a debate los aciertos y errores eligiendo el stack ya que muchas veces me pregunto: “¿y si hubiéramos elegido diferente?”'
        ],
        speaker: 'Cata Oyaneder',
        speakerTitle: [
            'Trabaja como software engineer en el equipo Comparison de TransferWise donde su objetivo es ayudar al usuario a entender todo lo relacionado con el coste al hacer transferrencias internacionales.',
            'Desde hace tres años vive en Londres donde primeramente trabajó para Sky News desarrollando aplicaciones en Node y React.',
            'Ahora su backend es otro pero con la ayuda de su equipo el challenge se hace mucho más divertido.'
        ],
        when: '18:00-18:50'
    }

};

Object.keys(talks).forEach((k) => {
    talks[k].slug = k;
});

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

module.exports = {
    all () {
        return Object.keys(talks)
            .map((id) => clone(talks[id]));
    },
    getBySlug (slug) {
        const talk = talks[slug];
        if (!talk) return null;
        return clone(talk);
    }
};
