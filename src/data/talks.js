const slugify = require('@sindresorhus/slugify');

const rawData = [
    {
        "Name": "Scott Hunter",
        "Title": "Director of Program Management at Microsoft",
        "ImageName": "Scott-Hunter.png",
        "Biography": "Scott Hunter is the Director of Program Management on the .NET team at Microsoft. His team builds the .NET Framework, .NET Core, ASP.NET, Entity Framework, managed languages (C#/F#/VB) and the Web and .NET Tooling for Visual Studio. Before Microsoft Scott was a developer and CTO at two startups.",
        "Presentation": ".NET Core 3.0 News and the Future of .NET Platform",

        "Links": {
            "Twitter": "https://twitter.com/coolcsh",
            "Channel9": "https://channel9.msdn.com/Events/Speakers/Scott-Hunter"
        },
        "ShowsInHome": true
    },
    {
        "Name": "Sherry List",
        "Title": "Azure Developer Technical Lead at Microsoft",
        "ImageName": "Sherry-List.png",

        "Presentation": "Azure Cognitive Services with Native Script",

        "Links": {
            "Twitter": "https://twitter.com/sherrrylst",
            "LinkedIn": "https://www.linkedin.com/in/sherrylist/"
        },
        "ShowsInHome": true,
        "When": "12:40 - 13:30",
        "Track": "2"
    },
    {
        "Name": "Glenn Condron",
        "Title": "Senior Program Manager .NET & VS at Microsoft",
        "ImageName": "Glenn-Condron.png",

        "Presentation": "ASP.NET Core, Beyond HTTP",
        "Description": "ASP.NET Core is evolving beyond web applications and APIs to embrace new app models including real-time, gRPC, and service workers, while continuing to leverage all the goodness you enjoy today in the stack. Our goal is to enable you to build distributed, cloud-native applications utilizing containers and microservices architecture patterns with the same ease you do today when building forms-over-data HTML apps. Learn about the changes coming in .NET Core 3 and beyond as the framework evolves to facilitate these application types.",
        "Links": {
            "Twitter": "https://twitter.com/condrong"
        },
        "ShowsInHome": true,
        "When": "11:30 - 12:20",
        "Track": "1"
    },
    {
        "Name": "César de la Torre",
        "Title": "Program Manager .NET Product Team at Microsoft",
        "ImageName": "cesar-de-la-torre.png",
        "Biography": "Working in the .NET Product Group building Microsoft's development platform, at Microsoft Corp. (Redmond campus). Focus on the new .NET Core, Azure end-to-end and enterprise solutions based on microservices, ASP.NET Core, Azure Service Fabric and App Service and cross-platform development on the server and client/mobile side. .NET is everywhere!",
        "Presentation": "Novedades en ML.NET Machine Learning para desarrolladores .NET",

        "Links": {
            "LinkedIn": "https://www.linkedin.com/in/cesar-de-la-torre-b31b512/",
            "Twitter": "https://twitter.com/cesardelatorre"
        },
        "ShowsInHome": false,
        "When": "11:30 - 12:20",
        "Track": "2"
    },

    {
        "Name": "Ryan Nowak",
        "Title": "Principal Software Engineer at Microsoft",
        "ImageName": "Ryan-Nowak.png",
        "Biography": "Ryan Nowak is a developer on the ASP.NET team, where he works on Razor, MVC and a variety of other things. He's been employed at Microsoft for 10 years, working on various developer tools such as profilers, IDEs and compilers. Ryan is one of the core developers on Blazor, focused on the ASP.NET Core integration, compiler, Razor language and tooling support.",
        "Presentation": "Introduction to Blazor",
        "Description": "Today, nearly all browser-based apps are written in JavaScript (or similar languages that transpile to it). Starting now, WebAssembly opens the floodgates to new choices, and one of the first realistic options may be .NET. We’re adding a simpler and powerful component programming model to ASP.NET Core and Razor that runs on the client or server. Blazor is a new experimental web UI framework from the ASP.NET team that aims to brings .NET applications into all browsers (including mobile) via WebAssembly. It allows you to build true full-stack .NET applications, sharing code across server and client, with no need for transpilation or plugins. In this talk I’ll demonstrate what you can do with Components and Blazor today and how it works on the underlying WebAssembly runtime behind the scenes. You’ll get a tour of the modern, component-based architecture (inspired by modern SPA frameworks) at work as we use it to build a responsive UI. We’ll cover our plans for running components on the server in ASP.NET Core 3.0 and on the client using Blazor.",

        "Links": {
            "Twitter": "https://twitter.com/aVerySpicyBoi"
        },
        "ShowsInHome": false,
        "When": "15:00 - 15:50",
        "Track": "1"
    },

    {
        "Name": "Manuel Rodrigo Cabello",
        "Title": "AI MVP & AI Technical Lead at Plain Concepts",
        "ImageName": "Rodrigo-Cabello.png",
        "Biography": "Software Engineer en Plain Concepts y MVP en Inteligencia Artificial con una experiencia de más de 9 años en el desarrollo de aplicaciones. Apasionado de las nuevas tecnologías y todo lo que tenga que ver con técnicas basadas en Inteligencia Artificial.",
        "Presentation": "IoT, una Raspberry Pi y predicción de fallos en un avión",
        "Description": "En esta charla veremos como podemos utilizar nuestros dispositivos (Raspberry PI) para adelantarnos a posibles fallos que puedan ocurrir en un motor de un avión. Explicaremos como se ha realizado el proceso de entrenamiento y como podemos ejecutar las predicciones en nuestro dispositivo utilizando IoT Edge.",
        "Links": {
            "Twitter": "https://twitter.com/mrcabellom",
            "LinkedIn": "https://www.linkedin.com/in/rodrigocabello/"
        },
        "ShowsInHome": false,
        "When": "12:40 - 13:30",
        "Track": "3"
    },
    {
        "Name": "Daniela Solís",
        "Title": "Software Development Engineer (AI) at Plain Concepts",
        "ImageName": "Daniela-Solis.png",
        "Biography": "Software engineer en el equipo de IA de Plain Concepts. Maestra en Inteligencia Artificial de la Universidad de Amsterdam, apasionada de las nuevas tecnologías y del mundo de la inteligencia artificial.",
        "Presentation": "IoT, una Raspberry Pi y predicción de fallos en un avión",
        "Description": "En esta charla veremos como podemos utilizar nuestros dispositivos (Raspberry PI) para adelantarnos a posibles fallos que puedan ocurrir en un motor de un avión. Explicaremos como se ha realizado el proceso de entrenamiento y como podemos ejecutar las predicciones en nuestro dispositivo utilizando IoT Edge.",
        "Links": {
            "Twitter": "https://twitter.com/danysolism",
            "LinkedIn": "https://www.linkedin.com/in/daniela-solis-morales/"

        },
        "ShowsInHome": false,
        "When": "12:40 - 13:30",
        "Track": "3"
    },
    {
        "Name": "Hugo Biarge",
        "Title": "Software Engineer at Plain Concepts",
        "ImageName": "Hugo-Biarge.png",
        "Presentation": "Autenticación en aplicaciones web y nativas. Escenarios y herramientas",
        "Description": "Estás pensando como securizar tus aplicaciones Web y tus aplicaciones nativas.¿Sabes cuales son los protocolos que deberías usar? Estas perdido con Azure AD y la federación. A lo largo de esta sesión aprenderás que elementos tienes que tener en cuenta, cuales son las librerías más utilizadas y los caminos que tienes que tomar para tener una aplicación segura con flujos modernos.",
        "Links": {
            "Twitter": "https://twitter.com/hbiarge",
            "LinkedIn": "https://www.linkedin.com/in/hbiarge/"

        },
        "ShowsInHome": false,
        "When": "17:20 - 18:10",
        "Track": "2"
    },
    {
        "Name": "Juliet Moreiro Bockhop",
        "Title": "Technical Evangelist at Microsoft",
        "ImageName": "juliet.png",
        "Presentation": "Apps inteligentes con Cognitive Services",
        "Links": {
            "Twitter": "https://twitter.com/julietsvq",
            "LinkedIn": "https://www.linkedin.com/in/julietmoreiro/"
        },
        "ShowsInHome": false,
        "When": "17:20 - 18:10",
        "Track": "1"
    },
    {
        "Name": "Eva Crespo",
        "Title": "UI Developer at Plain Concepts",
        "ImageName": "Eva-Crespo.png",
        "Presentation": "Comunicación entre equipos. Diseño y Desarrollo",
        "Description": "Diseñadores que deciden crear componentes de la nada, sin conocer el coste que eso conlleva, programadores que deciden hacer cambios sobre el diseño, tirando por tierra la estética y la usabilidad ¿Quién no es consciente de este problema? Queremos poner sobre la mesa estos problemas de comunicación y tratar de solucionarlos a través de un lenguaje común",
        "Links": {
            "Twitter": "https://twitter.com/evacrespob",
            "LinkedIn": "https://www.linkedin.com/in/evacrespob/"
        },
        "ShowsInHome": false,
        "When": "16:10 - 17:00",
        "Track": "4"
    },
    {
        "Name": "Paloma Celaá",
        "Title": "UX Designer at Plain Concepts",
        "ImageName": "Paloma-Celaa.png",
        "Presentation": "Comunicación entre equipos. Diseño y Desarrollo",
        "Description": "Diseñadores que deciden crear componentes de la nada, sin conocer el coste que eso conlleva, programadores que deciden hacer cambios sobre el diseño, tirando por tierra la estética y la usabilidad ¿Quién no es consciente de este problema? Queremos poner sobre la mesa estos problemas de comunicación y tratar de solucionarlos a través de un lenguaje común",
        "Links": {
            "Twitter": "https://twitter.com/PalomaCelaa",
            "LinkedIn": "https://www.linkedin.com/in/palomacelaa/"
        },
        "ShowsInHome": false,
        "When": "16:10 - 17:00",
        "Track": "4"
    },
    {
        "Name": "Alberto Varela",
        "Title": "Software Engineer at Plain Concepts",
        "ImageName": "Alberto-Varela.png",
        "Presentation": "Infraestructura como código en Azure",
        "Description": "Las plataformas Cloud nos han permitido crear y evolucionar procesos de automatización para tareas que antes solían ser 99% manuales. Durante esta sesión veremos cómo podemos aplicar los paradigmas de despliegue de aplicaciones al  aprovisionamiento de infraestructura, veremos las razones por las que nos interesa hacerlo y haremos un pequeño repaso con ejemplos de las diferentes herramientas que nos van a ayudar a conseguirlo en Azure: Bash/Powershell scripting, ARM,  Terraform, Pulumi o Ansible. También intentaré explicar por qué creo que los desarrolladores debemos implicarnos en la implantación de estas prácticas y que beneficios nos aporta frente a dejar este asunto solo en manos de IT/Ops.",
        "Links": {
            "Twitter": "https://twitter.com/artberri",
            "LinkedIn": "https://www.linkedin.com/in/artberri/"
        },
        "ShowsInHome": false,
        "When": "15:00 - 15:50",
        "Track": "3"
    },
    {
        "Name": "Eduard Tomás",
        "Title": "MVP in Visual Studio and Principal Tech Lead at Plain Concepts",
        "ImageName": "Eduard-Tomas.png",
        "Presentation": "Escenarios avanzados con AKS y .NET Core",
        "Description": "En esta charla veremos distintos escenarios avanzados con AKS y .Net Core: configuración con Key Vault, nodos virtuales y virtual kubelet para conseguir workloads mixtos (linux y windows)",
        "Links": {
            "Twitter": "https://twitter.com/eiximenis",
            "LinkedIn": "https://www.linkedin.com/in/etomas/"
        },
        "ShowsInHome": false,
        "When": "16:10 - 17:00",
        "Track": "1"
    },
    {
        "Name": "Luis Ruiz Pavón",
        "Title": "MVP in Visual Studio and Development Lead at Plain Concepts",
        "ImageName": "Luis-Ruiz.png",
        "Biography": "Desarrollador en Plain Concepts y MVP.",
        "Presentation": "Asp.Net Core Good Practices 2019",
        "Description": "En esta sesión hablaremos de buenas prácticas trabajando con Asp.Net Core y de cómo sacarles el máximo partido a las nuevas mejoras introducidas en la plataforma. </br></br>Entre otras cosas, veremos:</br></br><ul><li>Intrumentación de código</li><li>Estrategias de resiliencia</li><li>Health checks para orquestadores</li><li>Problem details para estandarización de errores</li><li>Api Behaviour para configurar comportamientos en las peticiones</li><li>Pipes en el contexto Http para mejora del rendimiento</li><li>Endpoint routing</li><li>Nuevo middleware de autorización desacoplado de MVC.</li><li>Estrategias de despliegue y testing con Docker</li></ul>",
        "Links": {
            "Twitter": "https://twitter.com/luisruizpavon",
            "LinkedIn": "https://www.linkedin.com/in/luisruizpavon/"
        },
        "ShowsInHome": false,
        "When": "12:40 - 13:30",
        "Track": "1"
    },
    {
        "Name": "Quique Fdez Guerra",
        "Title": "Senior Software Engineer & Delivery Lead at Plain Concepts",
        "ImageName": "Quique-Fernández.png",
        "Presentation": "Potenciando VUE con TypeScript, Inversify, Vuex y otras herramientas",
        "Description": "¿Conoces TypeScript? ¿Estás trabajando con Vue? ¡Vamos a por el siguiente nivel! En esta charla vas a aprender como crear aplicaciones reales y escalables utilizando lo mejor de TypeScript y Vue, con super herramientas como Nuxt, Inversify, Vuex etc. Estar continuamente actualizando a tu equipo puede ayudar a tu producto, al mismo equipo y a los proyectos en los que trabajáis. ",
        "Links": {
            "Twitter": "https://twitter.com/CKGrafico",
            "LinkedIn": "https://www.linkedin.com/in/enriquefdezguerra/"
        },
        "ShowsInHome": false,
        "When": "16:10 - 17:00",
        "Track": "3"
    },
    {
        "Name": "Carlos Landeras",
        "Title": "Web Lead at Plain Concepts Madrid & MVP in Developer Technologies",
        "ImageName": "Carlos-Landeras.png",
        "Presentation": "Asp.Net Core Good Practices 2019",
        "Description": "En esta sesión hablaremos de buenas prácticas trabajando con Asp.Net Core y de cómo sacarles el máximo partido a las nuevas mejoras introducidas en la plataforma. </br></br>Entre otras cosas, veremos:</br></br><ul><li>Intrumentación de código</li><li>Estrategias de resiliencia</li><li>Health checks para orquestadores</li><li>Problem details para estandarización de errores</li><li>Api Behaviour para configurar comportamientos en las peticiones</li><li>Pipes en el contexto Http para mejora del rendimiento</li><li>Endpoint routing</li><li>Nuevo middleware de autorización desacoplado de MVC.</li><li>Estrategias de despliegue y testing con Docker</li></ul>",
        "Links": {
            "Twitter": "https://twitter.com/carlos_lande",
            "LinkedIn": "https://www.linkedin.com/in/carloslanderas/"
        },
        "ShowsInHome": false,
        "When": "12:40 - 13:30",
        "Track": "1"
    },
    {
        "Name": "Pablo Doval",
        "Title": "Principal Data Architect at Plain Concepts",
        "ImageName": "Pablo-Doval.png",
        "Biography": "",
        "Presentation": "Recurrent Neural Networks with TF2.0",
        "Description": "In this session we will explore Recurrent Neural Networks (RNN) - a type of neural networks specially designed to process sequences - and their applications to time series and text processing (NLP). To make the session even more interesting, all the code will be developed using the latest version of TensorFlow 2.0, using the implementation of the models to discuss the major changes with respect to versions 1.x of the Deep Learning framework, and it will leverage MLFLlow within Azure Databricks as a development platform and model serving.",
        "Links": {
            "Twitter": "https://twitter.com/pablodoval",
            "LinkedIn": "https://www.linkedin.com/in/pablodoval/"
        },
        "ShowsInHome": false,
        "When": "17:20 - 18:10",
        "Track": "3"
    },
    {
        "Name": "Javier Cantón",
        "Title": "Research Team Lead at Plain Concepts",
        "ImageName": "Javi-Canton.png",
        "Presentation": "Writing high performance code in NetCore 3.0",
        "Description": "Para mi uno de los aspectos más interesantes de .NET Core es el performance, ya que han sido muchas las mejoras introducidas desde la primera versión y en .NETCore 3.0 ha hecho un esfuerzo extra en esta línea. Durante la sesión se repasarán conceptos que nos ayudarán a comprender mejor estas mejoras para conseguir que nuestras aplicaciones tengan mejores tiempos de arranque, consuman menos memoria y estresen menos el hardware ahorrando por consiguiente batería en dispositivos portátiles. Personalmente trabajo a diario en un 3D Graphics Engine en .NETCore (WaveEngine 3.0) y el objetivo es repasar aquellos conceptos de performance aprendidos durante el último año y aplicados a esta nueva versión. Si tu interés va más allá de que las cosas funcionen y el rendimiento es una de tus curiosidades esta charla es para ti.",
        "Links": {
            "Twitter": "https://twitter.com/jcant0n",
            "LinkedIn": "https://www.linkedin.com/in/jcanton/"
        },
        "ShowsInHome": false,
        "When": "15:00 - 15:50",
        "Track": "4"
    },
    {
        "Name": "Carlos Bastos Pérez",
        "Title": "Frontend Chapter Lead at Orange ",
        "ImageName": "Carlos-Bastos.png",
        "Presentation": "SSR con TypeScript, React y NextJS",
        "Description": "Si quieres descubrir cómo realizar tu primera aplicación isomórfica (render de la UI en backend y/o en frontend dependiendo del contexto de ejecución) para cubrir requisitos como el SEO, esta charla te enseñará a hacerlo con typescript, react y nextjs.",
        "Links": {
            "Twitter": "https://twitter.com/cbastospc",
            "LinkedIn": "https://www.linkedin.com/in/carlos-bastos-perez-cuadrado/"
        },
        "ShowsInHome": false,
        "When": "11:30 - 12:20",
        "Track": "3"
    },
    {
        "Name": "Javier Suarez",
        "Title": "Senior Software Engineer at Microsoft",
        "ImageName": "Javier-Suarez.png",
        "Presentation": "Optimizando Apps con Xamarin Forms",
        "Description": "A la hora de desarrollar aplicaciones con Xamarin.Forms el rendimiento suele ser un factor a tener en cuenta. En Xamarin.Forms, ¿sabes el ciclo de vida de un Layout?, ¿qué opciones de Layout son más óptimas?, ¿cómo afectan los Bindings al rendimiento y como tratarlos?, ¿qué debemos hacer para optimizar el trabajo con imágenes?, ¿ListView o CollectionView?, ¿y qué ocurre con Shell? A estas y otras preguntas habituales de rendimiento daremos solución, con datos y pruebas en forma de sencillos consejos a tener en cuenta a la hora de desarrollar una aplicación con Xamarin.Forms.",
        "Links": {
            "Twitter": "https://twitter.com/jsuarezruiz",
            "LinkedIn": "https://www.linkedin.com/in/jsuarezruiz/"
        },
        "ShowsInHome": false,
        "When": "12:40 - 13:30",
        "Track": "4"
    },
    {
        "Name": "Pablo Santos Luaces",
        "Title": "CTO & Founder at Plastic SCM",
        "ImageName": "Pablo-Santos.png",
        "Presentation": "Como migrar un producto multiplataforma a .NET Core, un caso práctico.",
        "Description": "A lo largo de esta charla intentaremos presentar como hemos afrontado la migración de nuestro producto multiplataforma a .NET Core, las piedras que hemos pasado en el camino, las ventajas e inconvenientes de esta aventura que hemos vivido en PlasticSCM.",
        "Links": {
            "Twitter": "https://twitter.com/psluaces",
            "LinkedIn": "https://www.linkedin.com/in/psantosl/"
        },
        "ShowsInHome": false,
        "When": "11:30 - 12:20",
        "Track": "4"
    },
    {
        "Name": "Marcos Cobeña Morián",
        "Title": "Software Development Engineer at Plain Concepts",
        "ImageName": "Marcos-Cobena.png",
        "Presentation": "Llevando Wave Engine a la web a través de WebGL y Web Assembly",
        "Description": "Wave Engine siempre ha soportado los principales dispositivos móviles: desde teléfonos hasta cascos XR; pero, teníamos espacio de mejora en la Web: simplemente no era posible correr nuestras apps en el navegador. Gracias a los primeros pasos con WebAssembly del Proyecto Mono, se nos ha abierto una nueva ventana que nos permite ejecutar nuestras apps hechas con C# encima de WebGL, cogiendo lo mejor de la aceleración hardware sin salir de la pestaña del navegador. Esta charla guiará a los asistentes en la ruta que hemos tomado hasta hoy, resaltando todos aquellos aprendizajes que hemos tenido y dejando a otros jugar con lo creemos será una de las plataformas más importantes en los próximos años.",
        "Links": {
            "Twitter": "https://twitter.com/1Marcos2Cobena",
            "LinkedIn": "https://www.linkedin.com/in/marcoscobena/"
        },
        "ShowsInHome": false,
        "When": "17:20 - 18:10",
        "Track": "4"
    },
    {
        "Name": "Luis Fraile",
        "Title": "DevOps Consultant at Plain Concepts & Microsoft MVP",
        "ImageName": "Luis-Fraile.png",
        "Presentation": "Tests de integración con .NET Core, Docker y Azure DevOps",
        "Description": "En esta sesión hablaremos sobre como poder crear nuestras pruebas funcionales en aplicaciones de .NET Core. Incluyendo la integración con servicios externos como bases de datos, caches etc. Todo ello preparándolo no solamente para la ejecución en nuestro entorno local sino integrándolo en nuestros Azure Pipelines ayudándonos de Docker y la tecnología de Service Containers de Azure DevOps.",
        "Links": {
            "Twitter": "https://twitter.com/lfraile",
            "LinkedIn": "https://www.linkedin.com/in/lfraile/"
        },
        "ShowsInHome": false,
        "When": "15:00 - 15:50",
        "Track": "2"
    },
    {
        "Name": "",
        "Title": "",
        "Presentation": "Presentation",
        "Description": "",
        "ShowsInHome": false,
        "Invisible": true,
        "Links": {
            "Twitter": "",
            "LinkedIn": ""
        }
    },
    {
        "Name": "",
        "Title": "",
        "Presentation": "Keynote",
        "Description": "",
        "ShowsInHome": false,
        "Invisible": true,
        "Links": {
            "Twitter": "",
            "LinkedIn": ""
        }
    },
    {
        "Name": "Matthias Buchhorn-Roth",
        "Title": "Cloud Solution Architect, Azure and Microsoft Cloud Deutschland",
        "ImageName": "Matthias-Buchhorn-Roth.png",
        "Presentation": "Developer Power! Make the world to a better place.",
        "Description": "Microsoft announced the AI for Humanitarian Action initiative, to support developers interested in creating tools and services with the goal of helping humanity. The initiative will focus on four specific areas: refugees and displaced people, the needs of children, disaster response, and human rights. I want to engage you as developer to register for a grant for this and the AI for Earth $50 million pursuit to create artificial intelligence that helps the planet, supporting initiatives for things like biodiversity, conservation, and climate change and AI for accessibility program designed to create technology for people with disabilities. I want to talk about the some projects and the achievements of the last 3 years.",
        "Biography": "At Microsoft I’m helping companies and organisations for their digital transformation journey, whereby I would be utilising my sound expertise in developing software products and IT projects, leading teams and build technology partnerships. On more than 35 projects I have gained a breadth of experience in liaising with customers in different sectors including public transportation, logistics, eGovernment, security, retail, media. I'm leading design thinking and hands-on workshops together with customers, build prototypes, and love to organize hackathons. As mentor I support the start-ups in the Microsoft Scaleup program and volunteer in the REDI-school.org and Code for life initiatives. Cloud Infrastructures, DevOps, Artificial Intelligence, IoT, Cyber security are the technical areas in which I specialised.",
        "Links": {
            "Twitter": "https://twitter.com/ma3u",
            "LinkedIn": " https://www.linkedin.com/in/mbuchhorn"
        },
        "ShowsInHome": false,
        "When": "16:10 - 17:00",
        "Track": "2"
    }
    //{
    //  "Name": "",
    //  "Title": "",
    //  "Presentation": "Presentation",
    //  "Description": "",
    //  "ShowsInHome": false,
    //  "Invisible": true,
    //  "Links": {
    //    "Twitter": "",
    //    "LinkedIn": ""
    //  }
    //}

]

const talks = {};

rawData.forEach(item => {
    if (!item.When) return;
    const id = slugify(item.Presentation)
    if (!talks[id]) {
        talks[id] = {
            slug: id,
            name: item.Presentation,
            description: item.Description ? [ item.Description ] : [],
            speakers: [
                {
                    name: item.Name,
                    title: [ item.Title ],
                    image: item.ImageName
                }
            ],
            when: item.When,
            track: item.Track
        }
    } else {
        talks[id].speakers.push({
            name: item.Name,
            title: [ item.Title ],
            image: item.ImageName
        })
    }
});

// const talks = {

//     'kubernetes-is-not-a-deployment-tool-its-a-platform': {
//         name: 'Kubernetes is not a deployment tool: it\'s a platform',
//         description: [
//             'Kubernetes se ha convertido poco a poco el standard del mercado para desplegar aplicaciones tanto en cloud como en datacenters tradicionales. Esto es así gracias a su potente API y sus primitivas que nos permiten describir el ciclo de vida del software. ¿Pero es Kubernetes la pieza final del puzzle? ¿Debemos utilizar esas primitivas directamente para nuestros deploys?',
//             'En esta charla veremos cómo podemos extender la funcionalidad base de Kubernetes para adecuarla a nuestras necesidades, y cómo esa extensibilidad está haciendo que grandes compañías estén creando nuevas herramientas usando Kubernetes como plataforma.'
//         ],
//         speaker: 'Jose Armesto',
//         speakerTitle: ['CloudBees'],
//         speakerImage: 'armesto.jpg',
//         track: '1',
//         when: '9:30-10:20'
//     }

// };

Object.keys(talks).forEach((k) => {
    talks[k].speaker = talks[k].speakers.map(s => s.name).join(', ');
});

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

module.exports = {
    all() {
        return Object.keys(talks)
            .map((id) => clone(talks[id]))
            .sort((a, b) => {
                if (a.when !== b.when) {
                    return a.when > b.when ? 1 : -1;
                } else {
                    return parseInt(a.track) > parseInt(b.track) ? 1 : -1;
                }
            });
    },
    getBySlug(slug) {
        const talk = talks[slug];
        if (!talk) return null;
        return clone(talk);
    }
};
