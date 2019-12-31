const inquirer = require('inquirer')
const chalk = require('chalk')

const response = chalk.bold.green
const resumeContent = chalk.bold.white

const resume = require('./resume.json')
const welcomeMessage ="Hello, Welcome to Amir Hamzah CLI Resume."

const resumePrompt ={
    type:'list',
    name:'resumeOptions',
    message:'What do you want to know me? Select below:',
    choices: [...Object.keys(resume),"Exit"]
}

function main(){
    console.log(resumeContent(welcomeMessage))
    resumeHandler()
}

function resumeHandler(){
    inquirer.prompt(resumePrompt)
        .then(answer =>{
            if(answer.resumeOptions ==="Exit")
                return

            let option = answer.resumeOptions
            console.log(response("---------------------------------------------------------------------------"))
            resume[`${option}`].forEach(info => {
                console.log(response("| =>")+resumeContent(info))    
            });
            console.log(response("---------------------------------------------------------------------------"))
            inquirer.prompt({
                type: 'list',
                name: 'exitBack',
                message: 'Go Back or Exit',
                choices:["Back", "Exit"]
                
            }).then(choice =>{
                if(choice.exitBack === "Exit")
                    return
                else   
                    resumeHandler()
            }).catch()

        }).catch()
}
main()