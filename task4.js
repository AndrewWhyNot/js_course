
class MyGraph {
    
    constructor(edge_array) {
        this.edges = edge_array;
    }
    
    /////////////////////////////////
    //                             //
    //   Depth-First Search, BFS   //
    //                             //
    /////////////////////////////////
    
    DFSstep(vertex, visited_vertices) {
        let verts = visited_vertices;
        for (let i = 0; i < this.edges.length; i++) {
            let elem = this.edges[i];
            let newVertex = "";
            if (elem[0] == vertex) {
                newVertex = String(elem[1]);
            }
            if (elem[1] == vertex) {
                newVertex = String(elem[0]);
            }
            if (newVertex == "")
                continue;
            if (verts.includes(newVertex))
                continue;
            verts += newVertex;
            verts = this.DFSstep(Number(newVertex), verts)
        }
        return verts;
    }
    
    DFS() {
        console.log("DFS:");
        let visited_vertices = this.DFSstep(0, "0");
        
        console.log(visited_vertices);
    }
    
    
    /////////////////////////////////
    //                             //
    //  Breadth-First Search, BFS  //
    //                             //
    /////////////////////////////////
    
    BFS() {
        console.log("BFS:");
        let visited_vertices = "0";
        let ind = 0;
        while (ind < visited_vertices.length) {
            let curVertex = Number(visited_vertices[ind]);
            this.edges.forEach(function(elem) {
                               let newVertex = "";
                               if (elem[0] == curVertex) {
                                    newVertex = String(elem[1]);
                               }
                                if (elem[1] == curVertex) {
                                    newVertex = String(elem[0]);
                               }
                               if (newVertex == "")
                                    return;
                               if (visited_vertices.includes(newVertex))
                                    return;
                               visited_vertices += newVertex;
            });
            ind++;
        }
        console.log(visited_vertices);
    }
    
    
    /////////////////////////////////
    //                             //
    //    Поиск Кратчайшего пути   //
    //     (Алгоритм Дейкстры)     //
    //                             //
    /////////////////////////////////
    
    LWPstep(vert, state) {
        let nextVertices = [];
        this.edges.forEach(function(elem) {
                           let newVertex = -1;
                           if (elem[0] == vert) {
                                newVertex = elem[1];
                           }
                           if (elem[1] == vert) {
                                newVertex = elem[0];
                           }
                           if (newVertex == -1)
                                return;
                           if (state[newVertex].was_visited) {
                                return;
                           }
                           state[newVertex].dist_from_st = Math.min(state[vert].dist_from_st + elem[2], state[newVertex].dist_from_st);
                           nextVertices[nextVertices.length] = newVertex;
        });
        
        state[vert].was_visited = true;
        
        return [nextVertices, state];
    }
    
    least_weight_path(stV, endV) {
        if (this.edges[0].length != 3) {
            console.log("Graph has no weights!");
            return;
        }
        
        let Vertex = function(dist_from_st, was_visited) {
            this.dist_from_st = dist_from_st;
            this.was_visited = was_visited;
        }
        let state = [];
        this.edges.forEach(function(elem) {
                           for (let i = 0; i <= 1; i++) {
                                if (state[elem[i]] == undefined || state[elem[i]] == null) {
                                    state[elem[i]] = new Vertex((elem[i] == stV ? 0 : Number.MAX_SAFE_INTEGER), false);
                                }
                           }
        });
        
        let all_vertices_visited = function(state) {
            for (let i = 0; i < state.length; i++) {
                if (!state[i].was_visited)
                    return false;
            }
            return true;
        }
        
        let to_visit = [0];
        while (!all_vertices_visited(state)) {
            let new_to_visit = [];
            for (let i = 0; i < to_visit.length; i++) {
                let res = this.LWPstep(to_visit[i], state);
                state = res[1];
                new_to_visit = new_to_visit.concat(res[0]);
            }
            to_visit = new_to_visit;
        }
        
        console.log("Shortest path from", stV, "to", endV, ":");
        console.log(state[endV].dist_from_st);
    }
}






let g1 = new MyGraph([[0, 3], [0, 6], [1, 3], [2, 3], [4, 3], [4, 6], [5, 4], [6, 7]]);
let g2 = new MyGraph([[0, 3, 5], [1, 3, 11], [2, 3, 56], [4, 3, 77], [5, 4, 89]]);

g1.BFS();
g1.DFS();

let g3 = new MyGraph([[0, 1, 10], [0, 2, 30], [0, 3, 50], [0, 4, 10], [1, 3, 40], [2, 3, 15], [2, 4, 10], [3, 4, 30]]);
g3.least_weight_path(0, 3);
