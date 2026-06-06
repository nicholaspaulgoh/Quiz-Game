// Load all moves from moves.json
async function loadAllMoves() {
  const response = await fetch('../moves.json')
  const data = await response.json()
  return data.moves
}

// Filter moves by type
function getMovesByType(moves, type) {
  return moves.filter(move => move.type === type)
}

// Find one move by its id
function getMoveById(moves, id) {
  return moves.find(move => move.id === id)
}

// Get the display colour for each type
function getTypeColour(type) {
  const colours = {
    fire:     '#E85D24',
    water:    '#185FA5',
    electric: '#BA7517',
    normal:   '#555570'
  }
  return colours[type] || '#888'
}