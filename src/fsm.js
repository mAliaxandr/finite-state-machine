class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(conf) {
        this.state = {
            initial: null,
            prev: [],
            next: [],
            states: null
        };
        if(conf){
            this.state.initial = conf.initial;
            this.state.states = conf.states;
        } else {
            throw new Error('message.failure');
        }
        
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        let values = ['normal','busy','sleeping','hungry'];
        var chenged = false;
        values.forEach( item => {
            if (item === state){
                this.state.prev.push(this.state.initial);
                this.state.next.pop();
                // console.log('chenge --- ', state, this.state.prev);
                this.state.initial = state;
                chenged = true;
            } 
        });
        if (chenged === false){
            // console.log('errrrrrrrrrrrrrr',state);
             throw new Error('message.failure');
        }   
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        // console.log('trigger -------',this.state.initial, event, this.state.states[this.state.initial].transitions[event]);

        this.changeState(this.state.states[this.state.initial].transitions[event])
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState('normal')
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        var obj = this.state.states;
        if (!event) {
            for (var key in obj){
                var keyName = [key]
                arr.push(keyName[0]);
                // console.log('key000 -- ', key, arr);
            }
        }
        for (var key in obj){
            // console.log('key -- ', key, event);
            
            if (obj[key].transitions[event]){
                var keyName = [key]
                arr.push(keyName[0]);
                // console.log('key222 -- ', key, arr);
            }
        }
        return arr;
        
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        // console.log('undo -1- ', this.state.initial, this.state.prev);
        
        if (!this.state.prev.length) {
            return false;
        }
        this.state.next.push(this.state.initial);
        this.state.initial = this.state.prev.pop();
        // console.log('undo -2- ', this.state.initial, this.state.prev);
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        // console.log('redo -1- ', this.state.initial, this.state.next);
        if (!this.state.next.length) {
            return false;
        }
        this.state.prev.push(this.state.initial);
        this.state.initial = this.state.next.pop();
        // console.log('redo -2- ', this.state.initial, this.state.next);
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state.prev = [];
        this.state.next = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
