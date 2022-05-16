<template>
  <div class="text-center">
    <div>
        <h1 class="text-center text-3xl font-extrabold text-gray-900">Juego cuatro en raya</h1>
        <h1 class="text-center text-3xl font-extrabold text-gray-900">Jugador: <span v-text="player"></span></h1>
    </div>
    <div class="min-h-full flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-gray-200 p-6 rounded border-gray-300">
            <table class="bg-indigo-500 border-double" align="center" border="1" v-if="!gameFinish">
                <tr v-for="(row, i) in matrix" :key="i">
                    <td v-for="(column, j) in row" :key="j" @click="selectSquare(i,j)" v-text="column" class="w-24 h-24 border border-solid border-black"></td>
                </tr>
            </table>
            <button v-if="gameFinish" @click="reload()" class="mx-2 bg-transparent hover:bg-indigo-600 text-indigo-700 font-bold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded">
                Volver a jugar!
            </button>
            <button  @click="this.$parent.play = false" class="mx-2 bg-transparent hover:bg-indigo-600 text-indigo-700 font-bold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded">
                Volver al inicio
            </button>

        </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
  export default {
    data: function(){
        return {
            matrix: [[' ',' ',' ',' '],[' ',' ',' ',' '],[' ',' ',' ',' '],[' ',' ',' ',' ']],
            player: 1,
            gameFinish:false
        }
    },
    methods: {
        reload(){
            this.matrix = [[' ',' ',' ',' '],[' ',' ',' ',' '],[' ',' ',' ',' '],[' ',' ',' ',' ']]
            this.player = 1
            this.gameFinish = false
        },
        selectSquare(i,j){ 
            if(this.matrix[i][j] == ' ')
            {
                this.matrix[i][j] = (this.player == 1) ? 'X':'O'
                this.player = (this.player == 1) ? 2 : 1
            }
            else
            {
                Swal.fire({
                    title: 'OPPS',
                    text:   "Esta casilla ya está en uso",
                    icon: 'warning',
                });
            }
            var result = this.verify()
            switch (result) {
                case ' ':
                    break;
                case 'X':
                    Swal.fire({
                        title: "Has ganado Jugador 1!!",
                        text: "Pulsa el boton volver a jugar para iniciar otra ronda",
                        icon: "success"
                    });
                    this.gameFinish = true;
                    break;
                case 'O':
                    Swal.fire({
                        title: "Has ganado Jugador 2!!",
                        text: "Pulsa el boton volver a jugar para iniciar otra ronda",
                        icon: "success"
                    });
                    this.gameFinish = true;
                    break;
                case 'N':
                    Swal.fire({
                        title: "Empate!!",
                        text: "Pulsa el boton volver a jugar para iniciar otra ronda",
                        icon: "info"
                    });
                    this.gameFinish = true;
                    break;
            }
        },
        verify(){
            var freeSquares = false;
            var winner = 'N';
            var i;
            for (i = 0; i < 4; i++) {
            if (this.matrix[i].find(element => element == ' ')) freeSquares = true;
            }
            if(freeSquares)
            {
                //validaciones horizontales
                if(this.matrix[0][0] == this.matrix[0][1] && this.matrix[0][1] == this.matrix[0][2] && this.matrix[0][2] == this.matrix[0][3] && this.matrix[0][0] != ' ') return this.matrix[0][0]
                if(this.matrix[1][0] == this.matrix[1][1] && this.matrix[1][1] == this.matrix[1][2] && this.matrix[1][2] == this.matrix[1][3] && this.matrix[1][0] != ' ') return this.matrix[1][0]
                if(this.matrix[2][0] == this.matrix[2][1] && this.matrix[2][0] == this.matrix[2][2] && this.matrix[2][0] == this.matrix[2][3] && this.matrix[2][0] != ' ') return this.matrix[2][0]
                if(this.matrix[3][0] == this.matrix[3][1] && this.matrix[3][0] == this.matrix[3][2] && this.matrix[3][0] == this.matrix[3][3] && this.matrix[3][0] != ' ') return this.matrix[3][0]

                //validaciones verticales
                if(this.matrix[0][0] == this.matrix[1][0] && this.matrix[0][0] == this.matrix[2][0] && this.matrix[0][0] == this.matrix[3][0] && this.matrix[0][0] != ' ') return this.matrix[0][0]
                if(this.matrix[0][1] == this.matrix[1][1] && this.matrix[0][1] == this.matrix[2][1] && this.matrix[0][1] == this.matrix[3][1] && this.matrix[0][1] != ' ') return this.matrix[0][1]
                if(this.matrix[0][2] == this.matrix[1][2] && this.matrix[0][2] == this.matrix[2][2] && this.matrix[0][2] == this.matrix[3][2] && this.matrix[0][2] != ' ') return this.matrix[0][2]
                if(this.matrix[0][3] == this.matrix[1][3] && this.matrix[0][3] == this.matrix[2][3] && this.matrix[0][3] == this.matrix[3][3] && this.matrix[0][3] != ' ') return this.matrix[0][3]

                //validaciones diagonales
                if(this.matrix[0][0] == this.matrix[1][1] && this.matrix[0][0] == this.matrix[2][2] && this.matrix[0][0] == this.matrix[3][3] && this.matrix[0][0] != ' ') return this.matrix[0][0]
                if(this.matrix[0][3] == this.matrix[1][2] && this.matrix[0][3] == this.matrix[2][1] && this.matrix[0][3] == this.matrix[3][0] && this.matrix[0][3] != ' ') return this.matrix[0][3]

            }
            else
            {
                return winner
            }

            return ' '
        }
    }
  }
</script>