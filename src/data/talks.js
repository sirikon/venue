const talks = {

    'kubernetes-is-not-a-deployment-tool-its-a-platform': {
        name: 'Kubernetes is not a deployment tool: it\'s a platform',
        description: `Kubernetes se ha convertido poco a poco el standard del mercado para desplegar aplicaciones tanto en cloud como en datacenters tradicionales. Esto es así gracias a su potente API y sus primitivas que nos permiten describir el ciclo de vida del software. ¿Pero es Kubernetes la pieza final del puzzle? ¿Debemos utilizar esas primitivas directamente para nuestros deploys?<br><br>

        En esta charla veremos cómo podemos extender la funcionalidad base de Kubernetes para adecuarla a nuestras necesidades, y cómo esa extensibilidad está haciendo que grandes compañías estén creando nuevas herramientas usando Kubernetes como plataforma.`,
        speaker: 'Jose Armesto',
        speakerTitle: 'CloudBees',
        speakerImage: 'armesto.jpg',
        track: '1',
        when: '9:30-10:20'
    },

    'web-components-api-esto-va-en-serio': {
        name: 'Web Components API: esto va en serio',
        description: 'La API de Web Components empieza a estar disponible en los navegadores principales… ¿Qué funcionalidades nos aporta exactamente? ¿Podemos dejar de usar frameworks JavaScript como React, Vue o Angular? En esta charla veremos cómo usar la API de Web Components con JavaScript vanilla, qué consecuencias tiene esta API sobre nuestro CSS, y qué ventajas ofrece respecto a los componentes implementados en frameworks como React.',
        speaker: 'Belén Albeza',
        speakerTitle: 'Mozilla',
        speakerImage: 'albeza.png',
        track: '2',
        when: '9:30-10:20'
    },

    'come-reza-data': {
        name: 'Come reza data',
        description: 'Hablaremos sobre como y cuando desplegar arquitecturas Big Data, así como los errores mas comunes cuando implantamos este tipo de soluciones en empresa, desde la cultura de trabajo a las herramientas a utilizar en función de los casos de explotación. Un viaje por las meteduras de pata mas comunes para encontrar las mejoras practicas de despliegue de este tipo de infraestructuras.',
        speaker: 'Inés Huertas',
        speakerTitle: 'DataTONS',
        speakerImage: 'huertas.jpg',
        track: '1',
        when: '10:30-11:20'
    },

    'agile-javascript': {
        name: 'Agile JavaScript',
        description: `En el mundo del desarrollo JavaScript, encontrar un flow estable y medianamente fácil de asimilar por nuestro equipo puede suponer todo un reto.<br><br>

        Un posible factor de éxito puede radicar en nuestra capacidad para alinear este entorno con nuestros valores de crafter pata negra: Testing, pair programming, continuous delivery, design patterns...<br><br>
        
        En 'Agile JavaScript' intentaremos hacer explícitos estos valores con el fin de que sean ellos los que nos ayuden a elegir el conjunto de prácticas y tecnologías que nos conviene adoptar. Una manera distinta de viajar por el estado actual y futuro del ecosistema JavaScript y no caer en la 'JavaScript fatigue'.`,
        speaker: 'Ricardo Borillo',
        speakerTitle: 'Universitat Jaume I',
        speakerImage: 'borillo.jpg',
        track: '2',
        when: '10:30-11:20'
    },

    'devops-is-not-what-you-think': {
        name: 'Devops is not what you think',
        description: `Seguramente alguien os haya contado que Devops es un rol, o un equipo, o incluso peor… el nombre moderno para los administradores de sistemas.<br><br>

        Lo que seguramente no os hayan contado es que Devops es un movimiento, una cultura y una serie de practicas que incluyendo las ideas de Agile, las amplian y modernizan adaptandolas a los tiempos actuales (SaaS, Cloud, etc).<br><br>
        
        Devops es la piedra ángular de todos las empresas tecnologicas de alto rendimiento y lo que les permite tener una buena frequencia de despliegue manteniendo la disponibilidad del sistema.<br><br>
        
        En esta charla describiremos la cultura (colaboración, confianza, aprendizaje continuo, etc.), las prácticas (incluir requisitos operacionales en el producto, automatización, Continuous Delivery, Infrastructure as Code, You Build It, You Run It, etc...), y daremos ideas de como introducirla (The Three Ways, Hiring, Incident Reports, Optimizar el Mean Ttime To Recovery, etc). Hablaremos de la importancia de la arquitectura, del desarrollo de software ágil y de distintas organizaciones de equipos que favorecen este tipo de cultura.`,
        speaker: 'Eduardo Ferro',
        speakerTitle: 'Nextail',
        speakerImage: 'ferro.jpg',
        track: '1',
        when: '12:00-12:50'
    },

    'ux-para-desarrolladores-front-y-back': {
        name: 'UX para desarrolladores front y back',
        description: `La experiencia de usuario de un producto o servicio digital es responsabilidad de todo el equipo de desarrollo y no solamente de los 'uxers'.<br><br>

        Muchos proyectos arrancan por la tecnología que se va usar y por ello haremos hincapié en la necesidad actual de poner el foco en el usuario y no en la tecnología si queremos construir productos útiles, deseables y usables.<br><br>
        
        Veremos en qué consiste el proceso de Diseño Centrado en el usuario y cómo integrarlo en los procesos de desarrollo más tradicionales.`,
        speaker: 'Virginia Aguirre',
        speakerTitle: 'Uxer School',
        speakerImage: 'aguirre.jpg',
        track: '2',
        when: '12:00-12:50'
    },

    'diez-retos-de-la-creacion-de-chatbots-y-asistentes-con-nlp': {
        name: '10 retos de la creación de chatbots y asistentes con NLP',
        description: 'Los asistentes virtuales y chatbots son tendencia y tienen un gran potencial, pero el uso de lenguaje natural trae asociados retos que los diseñadores y desarrolladores de estas nuevas interfaces tenemos que sortear. En la charla \'Retos de la creación de chatbots y asistentes con NLP\' desmitificaremos el NLP, repasaremos los 10 principales retos de estos proyectos, veremos ejemplos reales de éxitos y hablaremos de herramientas y buenas prácticas que ayudan a crear mejores experiencias conversacionales.',
        speaker: 'Cristina Santamarina',
        speakerTitle: 'The Neon Project',
        speakerImage: 'santamarina.jpg',
        track: '1',
        when: '13:00-13:50'
    },

    'viaje-desde-arquitectura-hexagonal-al-event-sourcing': {
        name: 'Viaje desde Arquitectura Hexagonal al Event Sourcing',
        description: `Arquitecturas basadas en eventos tales como Event Sourcing tienen múltiples beneficios: escalabilidad, gestión de la complejidad, auditoría, etc. Pero llegar a ellas es duro. Nos faltan conocimientos, experiencia y coraje.<br><br>

        En esta charla, mostraré algunos trucos y consejos para evolucionar vuestra arquitectura actual hacia Event Sourcing paso a paso. Empezaremos desde una aplicación con arquitectura hexagonal y acabaremos a las puertas de Event Sourcing.`,
        speaker: 'Carlos Buenosvinos',
        speakerTitle: 'Xing',
        speakerImage: 'buenosvinos.jpg',
        track: '2',
        when: '13:00-13:50'
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
