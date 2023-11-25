interface BalancerOptions {

}

export class LoadBalancer{    
    options: BalancerOptions
    
    constructor(options: BalancerOptions){
        this.options = options
    }

    public chooseMicroservice(){
        // verifica tabla de logs
        // calcula cual tiene mas puntos
        // elige microservicio
        
        // llama a microservicio
    }
}