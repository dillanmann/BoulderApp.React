import gql from 'graphql-tag';

export const GET_CENTERS = gql`
  query {
    centers {
      name
      id
      circuits{
        name
      }
    }
  }
`;

export const GET_CENTER_BY_ID =
    gql`
    query GetCenterById($id: ID!){
        center(id: $id){
            name
            circuits{
                name
                id
                problems{
                    id
                }
            }
        }
    }`;

export const GET_PROBLEM_BY_ID =
    gql`
    query GetProblemById($id: ID!){
        problem(id: $id){
            name
            id
            grade
        }
    }`;

export const GET_VGRADES = 
    gql`{ vGrades }`;

export const GET_CIRCUIT_BY_ID =
    gql`
    query GetCircuitById($id: ID!){
        circuit(id: $id){
            name
            problems{
                id
                name
                grade
            }
        }
    }`;
