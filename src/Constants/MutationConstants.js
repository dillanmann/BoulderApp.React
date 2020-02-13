import gql from 'graphql-tag';

export const DELETE_CIRCUIT_BY_ID = 
    gql`
    mutation DeleteCircuitById($id: ID!){
        deleteCircuit(id: $id){
            result
        }
    }`;

export const DELETE_CENTER_BY_ID =
    gql`
        mutation DeleteCenterById($id: ID!){
            deleteCenter(id: $id){
                result
            }
        }
    `;

export const CREATE_CIRCUIT_IN_CENTER =
    gql`
    mutation CreateCircuitInCenter($input: CreateCircuitInCenterInput!){
        createCircuitInCenter(input: $input){
            name
        }
    }
    `;

export const CREATE_PROBLEM_IN_CIRCUIT = 
    gql`
    mutation CreateProblemInCircuit($input: CreateProblemInCircuitInput!){
        createProblemInCircuit(input: $input){
          name
        }
      }`;

export const DELETE_PROBLEM_BY_ID = 
    gql`
    mutation DeleteProblemById($id: ID!){
        deleteProblem(id: $id){
            result
        }
    }`;

export const CREATE_CENTER = 
    gql`
        mutation CreateCenter($input: CenterInput!){
            createCenter(center: $input){
                name
            }
        }
    `;