# Chapter 5: Relative Homology and Exact Sequences as Structural Control

## Learning objectives
- Define relative chains and relative homology for pairs $(K,A)$.
- Construct and interpret the connecting map and long exact sequence.
- Use exactness to infer unknown groups from known neighbors.

## Prerequisite chapters
- Chapter 1
- Chapter 2
- Chapter 3
- Chapter 4

## Chapter target concept/theorem
Long exact sequence of a simplicial pair and practical role of relative homology.

## 1. Destination and Why It Matters

Chapter 4 computes homology of one complex at a time. Many problems are comparative: what survives in $K$ after we treat a subcomplex $A\subseteq K$ as background? Relative homology encodes exactly this comparison.

The destination is the long exact sequence of a pair
$$
\cdots\to H_n(A)\to H_n(K)\to H_n(K,A)\xrightarrow{\delta}H_{n-1}(A)\to\cdots
$$
which acts as a constraint system linking three families of groups.

Callback: quotient thinking from Chapter 3 and matrix discipline from Chapter 4 are both reused here.

## 2. Foundation Layer

### Primitive 1: Subcomplex inclusion
- What it is: $A\subseteq K$ where simplices of $A$ are simplices of $K$ and faces stay in $A$.
- Why it is load-bearing: Relative chains require a valid inclusion map of complexes.
- Tiny numeric example: Boundary circle triangulation is a subcomplex of a triangulated disk.
- Failure mode: Picking a simplex subset that is not face-closed.

### Primitive 2: Quotient chain groups
- What it is: $C_n(K,A)=C_n(K)/C_n(A)$.
- Why it is load-bearing: Chains in $A$ are treated as null background.
- Tiny numeric example: If $a\in C_1(A)$, then $[c+a]=[c]$ in $C_1(K,A)$.
- Failure mode: Replacing quotient with rank subtraction.

### Primitive 3: Induced boundary on quotient
- What it is: Define $\partial([c])=[\partial c]$.
- Why it is load-bearing: Relative homology needs a well-defined differential.
- Tiny numeric example: If $c'=c+a$ and $a\in C_n(A)$, then $\partial c'-\partial c=\partial a\in C_{n-1}(A)$.
- Failure mode: Ignoring well-definedness proof.

### Primitive 4: Short exact sequence of chain complexes
- What it is: $0\to C_*(A)\xrightarrow{i} C_*(K)\xrightarrow{q} C_*(K,A)\to0$.
- Why it is load-bearing: This algebraic package generates the long exact sequence in homology.
- Tiny numeric example: $\ker q_n=\operatorname{im} i_n$ in each degree $n$.
- Failure mode: Using nonexact maps and expecting exact-sequence conclusions.

### Primitive 5: Connecting morphism idea
- What it is: Relative cycle lifts to $K$, then its boundary lands in $A$.
- Why it is load-bearing: Gives degree-shift map $\delta:H_n(K,A)\to H_{n-1}(A)$.
- Tiny numeric example: In $(I,\partial I)$, relative 1-class maps to endpoint difference in $H_0(\partial I)$.
- Failure mode: Choosing lifts without checking class independence.

### Primitive 6: Exactness interpretation
- What it is: At each node, image of previous map equals kernel of next.
- Why it is load-bearing: Enables inference of unknown groups/maps.
- Tiny numeric example: If $\operatorname{im}(H_n(A)\to H_n(K))=0$, then $H_n(K)\to H_n(K,A)$ is injective.
- Failure mode: Reading sequence as a mere list rather than constraints.

## 3. Bottom-Up Thinking Stages

### Stage 1: Identify limitation of absolute invariants
**Motivation**:
Bottleneck: Absolute groups cannot express interaction between space and subspace.
Why-now trigger: Disk and boundary circle have different $H_1$, but relation is unclear.
Rejected shortcut: Compare only Betti numbers side by side.
Stage objective: Reframe problem around pair $(K,A)$.
Payoff signal: Questions become map-based, not count-based.

**Intuition**:
Mental model: Relative viewpoint keeps what is visible beyond baseline $A$.
Where it fails: Baseline metaphor does not replace formal quotient definitions.

**Construction step**:
Uses: Chapter 4 limitation and Primitive 1.
Pose invariants for inclusion $A\subseteq K$ rather than separate isolated spaces.

**Worked example**:
Example 1
Setup: Triangulated disk $K$ and boundary $A$.
Compute: $H_1(K)=0$, $H_1(A)=\mathbb{Z}$.
Interpret: Need structured relation, not contradiction.
Common mistake: Treating mismatch as computational error.

Example 2
Setup: Interval and endpoints.
Compute: Absolute $H_0$ values do not isolate constrained path behavior.
Interpret: Pair-level objects are necessary.
Common mistake: Assuming relative theory is only high-dimensional.

**What this unlocks next**:
Formal relative chain definition.
Remaining gap: Need quotient groups degree by degree.

### Stage 2: Define relative chain groups
**Motivation**:
Bottleneck: Comparative idea needs algebraic carrier.
Why-now trigger: We must formally null out chains supported in $A$.
Rejected shortcut: Delete simplices of $A$ from $K$ and hope boundaries still work.
Stage objective: Define $C_n(K,A)=C_n(K)/C_n(A)$.
Payoff signal: Chains differing by an $A$-chain become equivalent.

**Intuition**:
Mental model: Relative chain is a class of chains modulo background adjustments in $A$.
Where it fails: Equivalence classes are not unique representatives; careless representative choice causes confusion.

**Construction step**:
Uses: Primitive 2 and Chapter 3 quotient logic.
For each $n$, set $$C_n(K,A)=C_n(K)/C_n(A).$$ Write classes as $[c]$.

**Worked example**:
Example 1
Setup: Boundary edge chain $a\in C_1(A)$.
Compute: In $C_1(K,A)$, $[a]=0$.
Interpret: Purely $A$-internal data is quotiented out.
Common mistake: Keeping $a$ as nonzero because it is nonzero in $C_1(K)$.

Example 2
Setup: Relative class represented by $c$.
Compute: For any $a\in C_n(A)$, $[c+a]=[c]$.
Interpret: Class captures only information modulo $A$.
Common mistake: Treating representative changes as class changes.

**What this unlocks next**:
Need induced boundary map on classes.
Remaining gap: Must prove well-definedness.

### Stage 3: Induce boundary on relative chains
**Motivation**:
Bottleneck: Relative chains are static without a differential.
Why-now trigger: Homology needs cycles and boundaries in quotient complex.
Rejected shortcut: Declare $\partial([c])=[\partial c]$ without proof.
Stage objective: Show induced boundary is well-defined.
Payoff signal: Relative chain complex is valid.

**Intuition**:
Mental model: Because $A$ is subcomplex, boundaries of $A$-chains stay in $A$.
Where it fails: If $A$ were not face-closed, this argument would collapse.

**Construction step**:
Uses: Primitive 3 and Chapter 2 boundary.
If $[c]=[c']$, then $c-c'\in C_n(A)$, so $\partial(c-c')\in C_{n-1}(A)$, hence $[\partial c]=[\partial c']$. Therefore define $$\partial_n^{\mathrm{rel}}([c])=[\partial_n c].$$

**Worked example**:
Example 1
Setup: $c'=c+a$ with $a\in C_n(A)$.
Compute: $\partial c'-\partial c=\partial a\in C_{n-1}(A)$.
Interpret: Boundary classes agree.
Common mistake: Checking one case and skipping general argument.

Example 2
Setup: Class $[0]$ in $C_n(K,A)$.
Compute: $\partial^{\mathrm{rel}}([0])=[0]$.
Interpret: Zero class remains stable under induced boundary.
Common mistake: Thinking quotient boundary introduces external terms.

**What this unlocks next**:
Relative cycles, boundaries, and homology groups.
Remaining gap: Need structural connection with absolute groups.

### Stage 4: Build short exact sequence of chain complexes
**Motivation**:
Bottleneck: Relative and absolute objects are still disconnected.
Why-now trigger: We need a map-level framework that links $A$, $K$, and $(K,A)$.
Rejected shortcut: Compare only group ranks degreewise.
Stage objective: Construct $0\to C_*(A)\to C_*(K)\to C_*(K,A)\to0$.
Payoff signal: Exactness gives transfer mechanism between theories.

**Intuition**:
Mental model: Inclusion plus quotient splits chain information into internal and relative parts.
Where it fails: Same objects with wrong maps do not imply exactness.

**Construction step**:
Uses: Primitive 4 and Stage 2.
Define inclusion $i_n$ and quotient map $q_n$ each degree; prove $\ker q_n=\operatorname{im} i_n$ and surjectivity of $q_n$.

**Worked example**:
Example 1
Setup: $a\in C_n(A)$.
Compute: $q_n(i_n(a))=0$.
Interpret: $\operatorname{im} i_n\subseteq\ker q_n$.
Common mistake: Claiming $q_n$ is injective.

Example 2
Setup: Relative class $[c]\in C_n(K,A)$.
Compute: $q_n(c)=[c]$, so $q_n$ is surjective.
Interpret: Every relative chain has an absolute representative.
Common mistake: Forgetting surjectivity witness.

**What this unlocks next**:
Connecting map in homology.
Remaining gap: Need degree-shifting morphism.

### Stage 5: Define connecting morphism
**Motivation**:
Bottleneck: Sequence in homology is incomplete without degree-shift map.
Why-now trigger: Exactness at relative terms requires outgoing map to $H_{n-1}(A)$.
Rejected shortcut: Guess formula for $\delta$ without lift argument.
Stage objective: Define $\delta:H_n(K,A)\to H_{n-1}(A)$ and show well-definedness.
Payoff signal: Full long exact sequence can be assembled.

**Intuition**:
Mental model: Lift a relative cycle, take boundary, boundary falls into $A$.
Where it fails: Different lifts may differ by $A$-chains; independence must be proved.

**Construction step**:
Uses: Primitive 5 and Stage 3.
For $[c]\in H_n(K,A)$ with $\partial^{\mathrm{rel}}[c]=0$, choose representative $c\in C_n(K)$ so $\partial c\in C_{n-1}(A)$, then define $$\delta([c])=[\partial c]\in H_{n-1}(A).$$

**Worked example**:
Example 1
Setup: Pair $(I,\partial I)$ and relative 1-class of oriented interval.
Compute: $\delta$ sends class to $[v_1-v_0]\in H_0(\partial I)$.
Interpret: Endpoints appear as boundary trace.
Common mistake: Sending class to $H_1(A)$ instead of shifted degree.

Example 2
Setup: Pair $(D^2,S^1)$ with relative fundamental 2-class.
Compute: $\delta$ maps to generator of $H_1(S^1)\cong\mathbb{Z}$.
Interpret: Relative filling records boundary loop class.
Common mistake: Assuming relative cycle must map to zero.

**What this unlocks next**:
Long exact sequence of pair.
Remaining gap: Need exactness-based inference practice.

### Stage 6: Assemble and use long exact sequence
**Motivation**:
Bottleneck: Individual maps are not enough without exactness constraints.
Why-now trigger: We need to solve unknown groups from known neighbors.
Rejected shortcut: Memorize sequence without image-kernel interpretation.
Stage objective: Deploy exactness as inference tool.
Payoff signal: Unknown terms become computable from adjacent map behavior.

**Intuition**:
Mental model: At each node, incoming resolved information equals outgoing annihilated information.
Where it fails: Rank-only reasoning can miss nontrivial map kernels.

**Construction step**:
Uses: Primitive 6 and Stage 5.
Write
$$
\cdots\to H_n(A)\xrightarrow{i_*}H_n(K)\xrightarrow{j_*}H_n(K,A)\xrightarrow{\delta}H_{n-1}(A)\to\cdots
$$
and use $\operatorname{im}i_*=\ker j_*$ and $\operatorname{im}j_*=\ker\delta$.

**Worked example**:
Example 1
Setup: $(D^2,S^1)$ in degrees $2$ and $1$.
Compute: Exactness gives $H_2(D^2,S^1)\cong\mathbb{Z}$ and connecting map onto $H_1(S^1)\cong\mathbb{Z}$.
Interpret: Relative 2-class controls boundary loop.
Common mistake: Declaring map surjective/injective without checking adjacent groups.

Example 2
Setup: $(I,\partial I)$.
Compute: Sequence yields $H_1(I,\partial I)\cong\mathbb{Z}$ and relation to $H_0(\partial I)\to H_0(I)$.
Interpret: Relative class captures endpoint-connecting segment.
Common mistake: Ignoring degree shifts near $H_0$.

**What this unlocks next**:
Relational algebra for topological pairs.
Remaining gap: Need map functoriality and invariance under triangulation changes.

### Stage 7: Prepare functorial and invariance layer
**Motivation**:
Bottleneck: Exact sequences are powerful but still tied to fixed complexes/pairs.
Why-now trigger: We need behavior under maps and subdivisions.
Rejected shortcut: Treat each pair calculation as isolated.
Stage objective: Motivate induced maps and naturality in Chapter 6.
Payoff signal: Clear transition from pair algebra to global invariance.

**Intuition**:
Mental model: Exact sequences provide local constraints; functoriality transports them across maps.
Where it fails: Transport intuition is incomplete without chain-map proofs.

**Construction step**:
Uses: Stage 6 and Chapter 4 computation mindset.
Observe that all maps in the long exact sequence arise from chain-level maps, suggesting natural commutative diagrams and functorial homology. For map of pairs $f:(K,A)\\to(K',A')$, expect compatibility such as $\\delta\\circ f_*=f_*\\circ\\delta$.

**Worked example**:
Example 1
Setup: Inclusion of one pair $(A\subseteq K)$ into another $(A'\subseteq K')$.
Compute: Induced maps commute with connecting morphisms.
Interpret: Exact-sequence data is map-compatible.
Common mistake: Comparing only ranks and ignoring map commutativity.

Example 2
Setup: Subdivision of triangulation for same underlying space.
Compute: Group values remain isomorphic though matrix sizes change.
Interpret: Invariance should be stated map-theoretically.
Common mistake: Expecting literal equality of boundary matrices.

**What this unlocks next**:
Homology as functorial invariant across maps.
Remaining gap: Need explicit induced-map and invariance proofs.

## 4. Final Concept/Theorem Statement

Formal statement: For a simplicial pair $A\subseteq K$, define
$$
C_n(K,A)=C_n(K)/C_n(A),\qquad H_n(K,A)=\ker\partial_n^{\mathrm{rel}}/\operatorname{im}\partial_{n+1}^{\mathrm{rel}}.
$$
From the short exact sequence of chain complexes, one obtains the long exact sequence
$$
\cdots\to H_n(A)\to H_n(K)\to H_n(K,A)\xrightarrow{\delta}H_{n-1}(A)\to\cdots.
$$

Near-miss/non-example: Defining relative homology as set difference or rank subtraction of absolute groups is invalid and loses map structure.

Wrong mental model: Relative homology is absolute homology after deleting simplices of $A$.

Correction: Relative homology is quotient-chain algebra with induced differential and exact-sequence linkage.

Scope boundary: This chapter develops pair-level structure and exactness, but does not yet prove full functorial invariance under arbitrary simplicial maps and triangulation changes.

## 5. How the Thinking Process Could Have Invented It

After Chapter 4, the unresolved issue was comparative blindness: absolute groups did not encode how a subcomplex constrains or kills classes. The response was to quotient out $A$-chains and recover a valid differential, then use exact sequences to connect all resulting homology groups.

Failed attempt 1: Subtract Betti numbers of $A$ from those of $K$. This fails because homology comparison depends on maps and kernels/images, not scalar subtraction.

Failed attempt 2: Remove simplices of $A$ and run absolute homology on what remains. This fails because closure and quotient-identification behavior are not preserved by naive deletion.

Design rule: For relational topology, replace arithmetic comparison with quotient-chain constructions and exact map sequences.

Bridge to next chapter: In Chapter 6 we show how simplicial maps induce homology maps, why these maps are functorial, and why simplicial homology is invariant under triangulation changes.
