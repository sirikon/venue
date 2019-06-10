const talks = {

    'kubernetes-is-not-a-deployment-tool-its-a-platform': {
        name: 'Kubernetes is not a deployment tool: it\'s a platform',
        description: [
            'Kubernetes se ha convertido poco a poco el standard del mercado para desplegar aplicaciones tanto en cloud como en datacenters tradicionales. Esto es así gracias a su potente API y sus primitivas que nos permiten describir el ciclo de vida del software. ¿Pero es Kubernetes la pieza final del puzzle? ¿Debemos utilizar esas primitivas directamente para nuestros deploys?',
            'En esta charla veremos cómo podemos extender la funcionalidad base de Kubernetes para adecuarla a nuestras necesidades, y cómo esa extensibilidad está haciendo que grandes compañías estén creando nuevas herramientas usando Kubernetes como plataforma.'
        ],
        speaker: 'Jose Armesto',
        speakerTitle: ['CloudBees'],
        speakerImage: 'armesto.jpg',
        track: '1',
        when: '9:30-10:20'
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
