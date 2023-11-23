interface BalancerOptions {

}

export class LoadBalancer{    
    options: BalancerOptions
    
    constructor(options: BalancerOptions){
        this.options = options
    }
}