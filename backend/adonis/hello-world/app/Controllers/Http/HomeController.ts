import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    // async index({view}) {

    //     let dados = {
    //         usuarios: [
    //         {
    //             nome: 'Jose Marques',
    //             tecnologias: ['html', 'css', 'javascript'],
    //             admin: true
    //         },
    //         {
    //             nome: 'Magda Marques',
    //             tecnologias: ['javasctipt', 'php', 'python'],
    //             admin: true
    //         },
    //         {
    //             nome: 'Murilo Marques',
    //             tecnologias: ['javasctipt', 'php', 'python'],
    //             admin: false
    //         },
    //         {
    //             nome: 'Ana Marques',
    //             tecnologias: ['javasctipt', 'php', 'python'],
    //             admin: false
    //         }
    //     ]
    //     }
    //     return view.render('painel/homepage', dados)
    // }

    async index({view}) {
        return view.render('homepage');
    }

    async sobre({view}) {
        return view.render('sobre')
    }
}
